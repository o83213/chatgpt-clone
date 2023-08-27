import axios from "axios";

const messageApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const messageUrlEndPoint = "/message";

async function updateChatMessageById({
  chatId,
  message,
}: {
  chatId: string;
  message: Message;
}): Promise<Message> {
  console.log("updateChatMessageById", chatId, message);
  const res = await messageApi.post(messageUrlEndPoint, message, {
    params: {
      chatId,
    },
  });
  console.log("updateChatMessageById", res.data);
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
