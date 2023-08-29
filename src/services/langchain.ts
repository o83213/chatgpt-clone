import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

const langchangModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_KEY,
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        process.stdout.write(token);
      },
    },
  ],
});

export default langchangModel;
