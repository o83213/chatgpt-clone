"use client";
import Link from "next/link";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { Chat } from "@services/chat";

type Props = {
  id: string;
  chat: Chat;
  deleteChatMutation: (id: string) => Promise<void>;
};

function ChatRow({ id, chat, deleteChatMutation }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (pathname === `/chat/${id}`) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);
  const { messages } = chat;
  console.log("messages", messages);
  const userQuestion = messages?.filter(
    (messages) => messages?.author.name !== "ChatGPT"
  );
  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {userQuestion?.[userQuestion.length - 1]?.text || "New Chat"}
      </p>
      <TrashIcon
        className="h-5 w-5 text-gray-700 hover:text-red-700"
        onClick={() => {
          deleteChatMutation(id);
        }}
      />
    </Link>
  );
}

export default ChatRow;
