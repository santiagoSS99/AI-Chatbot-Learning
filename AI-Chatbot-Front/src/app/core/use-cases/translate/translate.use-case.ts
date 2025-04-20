import { environment } from '../../../../environments/environment';

export async function* translateUseCase(
  prompt: string,
  language: string,
  abortSignal: AbortSignal
) {
  try {
    const response = await fetch(`${environment.backendaiApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, language }),
      signal: abortSignal,
    });

    if (!response.ok) throw new Error('No se puede realizar la traducción');

    const reader = response.body?.getReader();
    if (!reader) {
      console.log('No se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }

    const decoder = new TextDecoder('utf-8');

    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const decodeChunk = decoder.decode(value, { stream: true });
      yield decodeChunk; // <- solo el pedazo nuevo, no todo el acumulado
    }

    return text;
  } catch (error) {
    return null;
  }
}
