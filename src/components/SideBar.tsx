"use client";
import NewChat from "@components/NewChat";
import { useSession, signOut } from "next-auth/react";

function SideBar() {
  const { data: session } = useSession();

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1 relative">
        <div>
          {/**New Chat */}
          <NewChat />
          <div>{/*ModelSelection*/}</div>
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
