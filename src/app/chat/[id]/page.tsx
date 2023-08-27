"use client";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import {
  getChatById,
  updateChatMessageById,
  messageUrlEndPoint as cacheKey,
} from "@services/message";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session } = useSession();
  const { data: chat, mutate } = useSWR(
    session ? [cacheKey, id] : null,
    ([cacheKey, id]) => getChatById({ chatId: id })
  );

  async function createMessageMutation(message: Message) {
    try {
      await updateChatMessageById({ chatId: id, message });
      mutate();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} chat={chat} />
      <ChatInput chatId={id} createMessageMutation={createMessageMutation} />
    </div>
  );
}

export default ChatPage;
