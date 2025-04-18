import { environment } from 'environments/environment';
import type { OrthographyResponse } from '../../../interfaces';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendaiApi}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error('no se pudo realizar la correción');

    const data = (await resp.json()) as OrthographyResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección',
    };
  }
};
