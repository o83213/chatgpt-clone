"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
  createMessageMutation: (message: Message) => Promise<void>;
};

function ChatInput({ chatId, createMessageMutation }: Props) {
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
    const newMessage: Message = {
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
      await createMessageMutation(newMessage);
      // Toast notification to say Loading

      const data = await fetch("/api/askQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input, chatId, model }),
      }).then((res) => {
        // Toast notification to say success
        return res.json();
      });
      const { message } = data;
      await createMessageMutation(message);
      toast.success("AI has responded!", { id: notification });
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
