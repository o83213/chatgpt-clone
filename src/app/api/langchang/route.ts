import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { NextRequest } from "next/server";

const runLLMChain = async (prompt: string, openAiModel: string) => {
  const encoder = new TextEncoder();

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const model = new ChatOpenAI({
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
};

async function POST(req: NextRequest) {
  const { prompt, openAiModel } = await req.json();

  const stream = runLLMChain(prompt, openAiModel);
  
  return new Response(await stream);
}

export { POST };
