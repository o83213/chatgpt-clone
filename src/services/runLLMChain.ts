import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIMessage, HumanMessage } from "langchain/schema";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

export async function runLLMChain(
  prompt: string,
  openAiModel: string,
  chat: Chat
) {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const model = new ChatOpenAI({
    temperature: 0.9,
    modelName: openAiModel,
    streaming: true,
    openAIApiKey: process.env.OPENAI_KEY,
    timeout: 20000,
    maxTokens: 400,
    callbacks: [
      {
        async handleLLMNewToken(token) {
          await writer.ready;
          await writer.write(encoder.encode(`${token}`));
        },
        async handleLLMEnd() {
          await writer.ready;
          await writer.close();
        },
      },
    ],
  });

  const { messages } = chat;

  const pastMessages = messages
    .map((message) => {
      if (message.author.name === "ChatGPT") {
        return new AIMessage(message.text);
      } else {
        return new HumanMessage(message.text);
      }
    })
    .slice(-10);

  model.call([...pastMessages, new HumanMessage(prompt)]);

  return stream.readable;
}
