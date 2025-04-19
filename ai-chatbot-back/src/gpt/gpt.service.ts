import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import {
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { prosConsDiscusserUseCase } from './use-cases/prosConsDiscusser.use-case';

@Injectable()
export class GptService {
  //call use cases

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async ortographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
  async prosConsDicusser(prosconsdiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosconsdiscusserDto.prompt,
    });
  }
  async prosConsDicusserStream(prosconsdiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: prosconsdiscusserDto.prompt,
    });
  }
}
