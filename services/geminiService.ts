
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDemandForecast = async (region: string, history: any[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this dairy sales history for ${region} and provide a 7-day demand forecast in JSON format.
    History: ${JSON.stringify(history)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          forecast: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                date: { type: Type.STRING },
                expectedDemandLiters: { type: Type.NUMBER },
                confidence: { type: Type.NUMBER },
                recommendation: { type: Type.STRING }
              },
              required: ["date", "expectedDemandLiters"]
            }
          }
        },
        required: ["forecast"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const getDairyAdvisory = async (healthLogs: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an experienced dairy veterinarian, provide advice based on these cattle health/milk logs: ${healthLogs}`,
  });
  return response.text;
};
