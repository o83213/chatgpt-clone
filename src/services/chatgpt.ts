import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  timeout: 20000,
});

export async function runGpt(prompt: string, openAiModel: string, chat: Chat) {
  const { messages } = chat;

  const pastMessages: OpenAI.Chat.Completions.CreateChatCompletionRequestMessage[] =
    messages.map((message) => {
      if (message.author.name === "ChatGPT") {
        return { role: "assistant", content: message.text };
      } else {
        return { role: "user", content: message.text };
      }
    });

  const aiResponse = openai.chat.completions.create({
    model: openAiModel,
    messages: [...pastMessages, { role: "user", content: prompt }],
    stream: true,
    temperature: 0.9,
    max_tokens: 1000,
  });

  // console.log("aiResponse", aiResponse);

  // aiResponse.then((response) => {
  //   console.log("response", response);
  // });

  // for await (const chunk of aiResponse) {
  //   // console.log("chunk", chunk);
  //   const message = chunk.choices[0].delta.content;
  //   if (chunk.choices[0].finish_reason === "stop") {
  //     console.log("message", message);
  //     console.log("stop");
  //     // await writer.ready;
  //     // await writer.close();
  //   } else {
  //     console.log("message", message);
  //     // await writer.ready;
  //     // await writer.write(encoder.encode(`${message}`));
  //   }
  // }
  return aiResponse;
  // return stream.readable;
}

export default openai;
