import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
} from '../../core/use-cases';
import { from } from 'rxjs';
import { translateUseCase } from '../../core/use-cases/translate/translate.use-case';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, language: string, abortSignal: AbortSignal) {
    return translateUseCase(prompt, language, abortSignal);
  }
}
