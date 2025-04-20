import { IsString } from 'class-validator';

export class TranslationDto {
  @IsString()
  prompt: string;

  @IsString()
  language: string;
}
