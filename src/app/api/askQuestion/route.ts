import { NextRequest, NextResponse } from "next/server";
import { runLLMChain } from "@services/runLLMChain";
import openai, { runGpt } from "@services/chatgpt";
import { OpenAI } from "openai";

async function POST(req: NextRequest, res: Response) {
  const { prompt, openAiModel, chat } = await req.json();

  // const { messages } = chat as Chat;
  // const pastMessages: OpenAI.Chat.Completions.CreateChatCompletionRequestMessage[] =
  //   messages.map((message) => {
  //     if (message.author.name === "ChatGPT") {
  //       return { role: "assistant", content: message.text };
  //     } else {
  //       return { role: "user", content: message.text };
  //     }
  //   });

  // const aiResponse = await openai.chat.completions.create({
  //   model: openAiModel,
  //   messages: [...pastMessages, { role: "user", content: prompt }],
  //   stream: true,
  //   temperature: 0.9,
  //   max_tokens: 1000,
  // });

  // for await (const chunk of aiResponse) {
  //   // console.log("chunk", chunk);
  //   const message = chunk.choices[0].delta.content;
  //   if (chunk.choices[0].finish_reason === "stop") {
  //     res.end();
  //     return;
  //   }
  // }

  // const stream = await runGpt(prompt, openAiModel, chat);
  // for await (const chunk of stream) {
  //   const message = chunk.choices[0].delta.content;
  //   console.log("message", message);
  // }

  const stream = await runLLMChain(prompt, openAiModel, chat);
  // return new Response(await stream);
  // return NextResponse.json({ answer: "" }, { status: 200 });
  // return new Response(await stream);
  return new Response(await stream);

  // return stream;
}

export { POST };
