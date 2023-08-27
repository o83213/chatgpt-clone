import { queryGPT } from "@/services/queryApi";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
  const { prompt, chatId, model } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      {
        answer: "Please provide a prompt",
      },
      { status: 400 }
    );
  }

  if (!chatId) {
    return NextResponse.json(
      {
        answer: "Please provide a valid chatId",
      },
      { status: 400 }
    );
  }
  try {
    const answer = await queryGPT(prompt, chatId, model);
    const aiMessage: Message = {
      text: (answer as string) || "Sorry, ChatGPT doesn't understand that yet.",
      author: {
        email: "https://api.openai.com",
        avatar: "https://links.papareact.com/89k",
        name: "ChatGPT",
      },
    };
    return NextResponse.json({ message: aiMessage }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: `ChatGPT was unable to respond to your prompt. (Error: ${
          err?.message || "Unknown error"
        })`,
      },
      { status: 500 }
    );
  }
}

export { POST };
