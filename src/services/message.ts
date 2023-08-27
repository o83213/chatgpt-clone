import axios from "axios";

const messageApi = axios.create({
  baseURL: "/api",
});

export const messageUrlEndPoint = "/message";

async function updateChatMessageById({
  chatId,
  message,
}: {
  chatId: string;
  message: Message;
}): Promise<Message> {
  const res = await messageApi.post(messageUrlEndPoint, message, {
    params: {
      chatId,
    },
  });
  return res.data;
}

async function getChatById({ chatId }: { chatId: string }): Promise<Chat> {
  const res = await messageApi.get(messageUrlEndPoint, {
    params: {
      chatId,
    },
  });

  return res.data;
}

export { updateChatMessageById, getChatById };
