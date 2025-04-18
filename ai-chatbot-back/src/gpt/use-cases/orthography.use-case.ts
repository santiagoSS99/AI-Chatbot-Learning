import OpenAI from 'openai';

interface Options {
  prompt: string;
  // temperature: string
  // prompt: string
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        te serán proveidos textos con posibles errores ortograficos y gramaticales, 
        Las palabras usadas deben de existir en el dicionario de la Real Academia,
        debes de responder en formato JSON, sin formato de bloque de código ni texto adicional.
        tu tarea es corregirlos y retornar la información corregida sin errores ortográficos,
        rambien debes de dar un porcentaje de acierto por el usuario

        si no hay errores, debes de retornar un mensaje de felicitaciones

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[]// ['error -> Solución']
          message: string, // Usa emojis y texto para felicitar al usuario
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 150,
  });

  // console.log(completion);

  const jsonResponse = JSON.parse(completion.choices[0].message.content);

  return jsonResponse;
};
