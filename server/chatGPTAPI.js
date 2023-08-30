import OpenAI from "openai";
import {} from 'dotenv/config'

async function chatGPTCall(input)  {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [];
    messages.push({ role: "user", content: input });

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages});

    const completion_text = completion.choices[0].message.content;

    return (completion_text);
    
  };

export{chatGPTCall};