import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Chat from "@/models/chat";

async function POST(req: NextRequest) {
  const { user } = await req.json();

  await connectMongoDB();

  const chat = await Chat.create({
    userEmail: user.email,
    messages: [],
  });

  return NextResponse.json(chat, { status: 201 });
}

async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("email");

  await connectMongoDB();

  const chats = await Chat.find({ userEmail }).sort({ createdAt: "asc" });

  return NextResponse.json(chats, { status: 200 });
}

async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectMongoDB();

  const chat = await Chat.findByIdAndDelete(id);

  return NextResponse.json(chat, { status: 200 });
}

export { POST, GET, DELETE };
