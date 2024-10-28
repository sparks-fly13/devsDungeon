import { NextResponse } from "next/server";
import OpenAI from 'openai';

export async function POST(req: Request){
    const { question } = await req.json();
    const baseURL ="https://api.aimlapi.com/v1";
    const apiKey = process.env.AIML_API_KEY;
    const openai = new OpenAI({
        apiKey,
        baseURL
    });
    try {
        const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a well-informed individual who provides quality information.'
            }, {
                role: 'user',
                content: `Help me with: ${question}`
            }
        ],
        max_tokens: 256,
    })
    const reply = res.choices[0]?.message?.content;
    if(!reply) throw new Error('No reply from AI');
    return NextResponse.json({ reply });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}