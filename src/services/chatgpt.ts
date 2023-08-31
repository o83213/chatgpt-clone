import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function runGpt(prompt: string, openAiModel: string, chat: Chat) {}

export default openai;
