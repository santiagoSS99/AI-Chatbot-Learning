import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto, TranslationDto } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.ortographyCheck(orthographyDto);
  }
  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() prosconsdiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosconsdiscusserDto);
  }
  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosconsdiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDicusserStream(prosconsdiscusserDto);

    res.setHeader('Content-Type', 'aplication/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      // console.log(const)
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }

  @Post('translate')
  async translationToOtherLanguage(
    @Body() translationDto: TranslationDto,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.translation(translationDto);

    res.setHeader('Content-Type', 'aplication/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      // console.log(const)
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }
}
