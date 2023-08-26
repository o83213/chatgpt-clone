import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Chat from "@/models/chat";

async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  const { text, user } = await req.json();
  console.log(text, user);
  await connectMongoDB();
  await Chat.findOneAndUpdate(
    {
      _id: chatId,
    },
    {
      $push: {
        message: {
          text,
          author: {
            name: user.name,
            avatar: user.avatar,
          },
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

async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  await connectMongoDB();
  const chats = await Chat.find({ _id: chatId }).sort({ updatedAt: -1 });
  return NextResponse.json(chats, { status: 200 });
}

export { POST, GET };
