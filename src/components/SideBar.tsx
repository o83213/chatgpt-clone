/* eslint-disable @next/next/no-img-element */
"use client";
import NewChat from "@components/NewChat";
import { useSession, signOut } from "next-auth/react";
import {
  createChat,
  getChats,
  deleteChat,
  chatUrlEndPoint as cacheKey,
} from "@services/chat";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import ChatRow from "@components/ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    isLoading,
    error,
    data: chats,
    mutate,
  } = useSWR(
    session ? [cacheKey, session.user?.email!] : null,
    ([cacheKey, email]) => getChats({ email })
  );

  async function createChatMutation() {
    try {
      const newChat = await createChat({ email: session?.user?.email! });
      mutate();
      router.push(`/chat/${newChat._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteChatMutation(id: string) {
    try {
      const deletedChat = await deleteChat({ id });
      mutate();
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-2 bg-[#202123]/50 flex flex-col h-full">
      <div className="flex-1 relative">
        <div>
          {/**New Chat */}
          <NewChat createChatMutation={createChatMutation} />
          <div className="hidden md:inline">
            <ModelSelection />
          </div>
          <div className="flex flex-col space-y-2 my-2">
            {isLoading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.map((chat: any) => (
              <ChatRow
                key={chat._id}
                id={chat._id}
                chat={chat}
                deleteChatMutation={deleteChatMutation}
              />
            ))}
          </div>
          {/**Map through the ChatRows */}
        </div>
      </div>
      {session && (
        <button
          className="flex items-center cursor-pointer mx-auto mb-2 gap-3 hover:opacity-30 transition-all duration-300"
          onClick={() => signOut()}
        >
          <img
            className="h-12 w-12 rounded-full "
            src={session.user?.image || "/default-avatar.jpg"}
            alt="user avatar"
          ></img>
          <span className="text-white text-lg font-bold">Logout</span>
        </button>
      )}
    </div>
  );
}

export default SideBar;
