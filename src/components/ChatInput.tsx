"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
  createMessageMutation: (message: Message) => Promise<void>;
  setStreamedAnswer: Dispatch<SetStateAction<string>>;
  chat?: Chat;
};

function ChatInput({
  chatId,
  createMessageMutation,
  setStreamedAnswer,
  chat,
}: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");
    const userMessage: Message = {
      text: input,
      author: {
        email: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api?name=${session?.user?.email!}`,
      },
    };
    const notification = toast.loading("AI is thinking...");
    try {
      setStreamedAnswer("");
      const [_, aiResponse] = await Promise.all([
        createMessageMutation(userMessage),
        fetch("/api/askQuestion", {
          method: "POST",
          body: JSON.stringify({
            prompt: input,
            openAiModel: model,
            chat,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);

      toast.success("AI has responded!", { id: notification });
      // start from here
      const reader = aiResponse.body!.getReader();
      let responseText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);
        responseText = responseText + text;
        setStreamedAnswer((prevData) => {
          return prevData + text;
        });
      }

      const aiResponseMessage = {
        text: responseText,
        author: {
          email: "https://api.openai.com",
          avatar: "https://links.papareact.com/89k",
          name: "ChatGPT",
        },
      };
      await createMessageMutation(aiResponseMessage);
    } catch (err) {
      console.log(err);
      toast.error("AI has failed to respond!", {
        id: notification,
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent flex-1 outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          type="text"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="Type your message here..."
        />
        <button
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
