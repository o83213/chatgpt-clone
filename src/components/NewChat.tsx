"use client";
import { PlusIcon } from "@heroicons/react/24/outline";

type Props = {
  createChatMutation: () => Promise<void>;
};

function NewChat({ createChatMutation }: Props) {
  return (
    <div
      onClick={() => {
        createChatMutation();
      }}
      className="border-gray-700 border chatRow"
    >
      <PlusIcon className="h-4 w-4" />
      <h2>New Chat</h2>
    </div>
  );
}
export default NewChat;
