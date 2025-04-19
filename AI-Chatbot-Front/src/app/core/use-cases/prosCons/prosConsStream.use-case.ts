import { environment } from '../../../../environments/environment';

export async function* prosConsStreamUseCase(prompt: string) {
  try {
    const response = await fetch(
      `${environment.backendaiApi}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!response.ok) throw new Error('No se puede realizar la comparación');

    const reader = response.body?.getReader();
    if (!reader) {
      console.log('No se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }

    const decoder = new TextDecoder('utf-8');

    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodeChunk = decoder.decode(value, { stream: true });
      text += decodeChunk;

      yield text;
    }

    return text;
  } catch (error) {
    return null;
  }
}

// export const prosConsStreamUseCase = async (prompt: string) => {
//   try {
//     const response = await fetch(
//       `${environment.backendaiApi}/pros-cons-discusser-stream`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       }
//     );

//     if (!response.ok) throw new Error('No se puede realizar la comparación');

//     const reader = response.body?.getReader();
//     const decoder = new TextDecoder('utf-8');
//     let result = '';

//     if (!reader) throw new Error('No se pudo leer el stream');

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
//       result += decoder.decode(value, { stream: true });
//     }

//     return {
//       ok: true,
//       role: 'assistant',
//       content: result,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       ok: false,
//       role: '',
//       content: 'no se pudo realizar la comparación!',
//     };
//   }
// };
