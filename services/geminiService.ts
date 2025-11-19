import { GoogleGenAI, Type } from "@google/genai";
import { QuizData } from '../types';

export const generateQuizForChapter = async (chapterTitle: string, context: string): Promise<QuizData | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
      Você é um especialista em Redação Oficial Brasileira (Manual de Redação da Presidência da República).
      Crie um quiz de 3 perguntas de múltipla escolha sobre o tema: "${chapterTitle}".
      Use o seguinte contexto como base para as perguntas, mas pode expandir com seu conhecimento geral sobre o tema:
      "${context}"
      
      As perguntas devem ser educativas e desafiadoras.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswerIndex: { type: Type.INTEGER, description: "Index (0-3) of the correct answer" },
                  explanation: { type: Type.STRING, description: "Brief explanation of why the answer is correct" }
                },
                required: ["question", "options", "correctAnswerIndex", "explanation"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizData;
    }
    return null;

  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};
