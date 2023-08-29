import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

export async function runLLMChain(prompt: string, openAiModel: string) {
  const encoder = new TextEncoder();

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const model = new ChatOpenAI({
    temperature: 0.9,
    modelName: openAiModel,
    streaming: true,
    openAIApiKey: process.env.OPENAI_KEY,
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

  model.call([new HumanMessage(prompt)]);

  return stream.readable;
}
