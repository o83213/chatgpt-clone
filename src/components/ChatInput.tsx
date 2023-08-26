"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const { data: session } = useSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api?name=${session?.user?.email!}`,
      },
    };
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={(e) => sendMessage} className="p-5 space-x-5 flex">
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
      <div>{/**ModelSelection */}</div>
    </div>
  );
}

export default ChatInput;
