import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class OrthographyDto {
  @IsString()
  readonly prompt: string;

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number;
}
