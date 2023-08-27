import openai from "./chatgpt";

// async function query(prompt: string, chatId: string, model: string) {
// TODO chatId can be use as a memory to store the conversation
async function queryGPT(prompt: string, chatId: string, model: string) {
  const answer = await openai.chat.completions
    .create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.choices[0].message.content)
    .catch(
      (err) =>
        `ChatGPT was unable to respond to your prompt: Error: ${err.message}}`
    );
  return answer;
}

export { queryGPT };
