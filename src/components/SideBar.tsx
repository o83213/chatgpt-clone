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
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1 relative">
        <div>
          {/**New Chat */}
          <NewChat createChatMutation={createChatMutation} />
          <div>{/*ModelSelection*/}</div>
          {chats?.map((chat: any) => (
            <ChatRow
              key={chat._id}
              id={chat._id}
              chat={chat}
              deleteChatMutation={deleteChatMutation}
            />
          ))}
          {/**Map through the ChatRows */}
        </div>
      </div>
      {session && (
        <img
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          src={session.user?.image || "/default-avatar.jpg"}
          alt="user avatar"
          onClick={() => signOut()}
        ></img>
      )}
    </div>
  );
}

export default SideBar;
