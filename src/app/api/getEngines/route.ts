import { NextRequest, NextResponse } from "next/server";
import openai from "@services/chatgpt";

type Options = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Options[];
};

async function GET() {
  const models = await openai.models.list();
  const chatModels = models.data.filter((model) => model.id.includes("gpt"));
  const modelOptions = chatModels
    .map((modelData) => ({
      value: modelData.id,
      label: modelData.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return NextResponse.json({ modelOptions }, { status: 200 });
}
export { GET };
