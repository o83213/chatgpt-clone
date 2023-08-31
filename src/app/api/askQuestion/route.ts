import { NextRequest, NextResponse } from "next/server";
import { runLLMChain } from "@services/runLLMChain";

async function POST(req: NextRequest) {
  const { prompt, openAiModel, chat } = await req.json();

  const stream = runLLMChain(prompt, openAiModel, chat);
  // const answer = await runLLMChain(prompt, openAiModel, chat);

  return new Response(await stream);
  // return NextResponse.json({ answer }, { status: 200 });
}

export { POST };
