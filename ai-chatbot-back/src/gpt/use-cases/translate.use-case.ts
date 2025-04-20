import OpenAI from 'openai';

interface Options {
  prompt: string;
  language: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, language }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${language}:${prompt}`,
      },
    ],
    model: 'chatgpt-4o-latest',
    temperature: 0.1,
    max_tokens: 500,
  });
};
