"use client";
import { useSession } from "next-auth/react";
import Message from "@components/Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  chatId: string;
  chat?: Chat;
};

function Chat({ chat }: Props) {
  const messages = chat?.messages || [];
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {chat ? (
        messages?.length === 0 && (
          <>
            <p className="mt-10 text-center text-white">
              Type a prompt in below to get started!
            </p>
            <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
          </>
        )
      ) : (
        <p className="mt-10 text-center text-white animate-pulse">
          Loading Messages...
        </p>
      )}
      {messages.map((message) => {
        return <Message key={message?._id} message={message} />;
      })}
    </div>
  );
}

export default Chat;
