import { NextRequest } from "next/server";
import { runLLMChain } from "@services/runLLMChain";

async function POST(req: NextRequest) {
  const { prompt, openAiModel } = await req.json();

  const stream = runLLMChain(prompt, openAiModel);

  return new Response(await stream);
}

export { POST };
