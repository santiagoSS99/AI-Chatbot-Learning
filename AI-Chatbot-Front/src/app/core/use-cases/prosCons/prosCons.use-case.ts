import { environment } from '../../../../environments/environment';
import type { ProsConsResponse } from '../../../interfaces';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${environment.backendaiApi}/pros-cons-discusser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!response.ok) throw new Error('No se puede realizar la comparación');

    const dataProsConsStream = (await response.json()) as ProsConsResponse;

    return {
      ok: true,
      ...dataProsConsStream,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: '',
      content: 'no se pudo realizar la comparación!',
    };
  }
};
