import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  //call use cases

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // from openai import OpenAI
  // client = OpenAI()

  // completion = client.chat.completions.create(
  //   model="gpt-4.1",
  //   messages=[
  //       {
  //           "role": "user",
  //           "content": "Write a one-sentence bedtime story about a unicorn."
  //       }
  //   ]
  // )

  // print(completion.choices[0].message.content)

  async ortographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
}
