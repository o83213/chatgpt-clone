import axios from "axios";

const chatApi = axios.create({
  baseURL: "/api",
});

export const chatUrlEndPoint = "/chat";

async function createChat({ email }: { email: string }): Promise<Chat> {
  const res = await chatApi.post(chatUrlEndPoint, {
    user: {
      email,
    },
  });
  return res.data;
}

async function getChats({ email }: { email: string }): Promise<Chat[]> {
  const res = await chatApi.get(chatUrlEndPoint, {
    params: {
      email,
    },
  });
  return res.data;
}

async function deleteChat({ id }: { id: string }): Promise<Chat> {
  const res = await chatApi.delete(chatUrlEndPoint, {
    params: {
      id,
    },
  });
  return res.data;
}

type Author = {
  name: string;
  avatar: string;
};

type Message = {
  _id: string;
  text: string;
  author: Author;
  createdAt?: string;
  updatedAt?: string;
};

export type Chat = {
  _id: string;
  userEmail: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export { createChat, getChats, deleteChat };
