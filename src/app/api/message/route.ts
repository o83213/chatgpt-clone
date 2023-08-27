import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Chat from "@/models/chat";

async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  console.log("Server data", chatId);
  const { text, author } = await req.json();
  console.log(text, author);
  await connectMongoDB();
  const updatedChat = await Chat.findOneAndUpdate(
    {
      _id: chatId,
    },
    {
      $push: {
        messages: {
          text,
          author,
        },
      },
    }
  );

  return NextResponse.json(
    {
      message: "Message created successfully!",
    },
    { status: 201 }
  );
}

// Get chat with id
async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  await connectMongoDB();
  const chat = await Chat.findOne({ _id: chatId }).sort({ updatedAt: -1 });
  return NextResponse.json(chat, { status: 200 });
}

export { POST, GET };
