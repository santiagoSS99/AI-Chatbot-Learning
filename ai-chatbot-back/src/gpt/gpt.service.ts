import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import {
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  translateUseCase,
  prosConsDiscusserUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslationDto } from './dtos';

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
  async translation(translationDto: TranslationDto) {
    return await translateUseCase(this.openai, {
      prompt: translationDto.prompt,
      language: translationDto.language,
    });
  }
}
