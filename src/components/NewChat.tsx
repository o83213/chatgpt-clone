import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@lib/firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  async function createChat() {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chats/${doc.id}`);
  }

  return (
    <div onClick={() => {}} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <h2>New Chat</h2>
    </div>
  );
}
export default NewChat;
