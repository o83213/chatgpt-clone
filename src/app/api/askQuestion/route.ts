import { NextRequest, NextResponse } from "next/server";
import { runLLMChain } from "@services/runLLMChain";
import openai from "@services/chatgpt";
import { OpenAI } from "openai";

async function POST(req: NextRequest, res: Response) {
  const { prompt, openAiModel, chat } = await req.json();

  const stream = runLLMChain(prompt, openAiModel, chat);

  return new Response(await stream);
}

export { POST };
