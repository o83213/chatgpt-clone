import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Chat from "@/models/chat";

async function POST(req: NextRequest) {
  const { user } = await req.json();
  console.log(user);
  await connectMongoDB();
  await Chat.create({
    userEmail: user.email,
    message: [],
  });

  return NextResponse.json(
    {
      message: "Chat created successfully!",
    },
    { status: 201 }
  );
}

async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("email");
  await connectMongoDB();
  const chats = await Chat.find({ userEmail }).sort({ createdAt: "asc" });
  return NextResponse.json(chats, { status: 200 });
}

export { POST, GET };
