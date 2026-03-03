
import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI features will not work.");
    }
    aiInstance = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
  }
  return aiInstance;
};

export const getDemandForecast = async (region: string, history: any[]) => {
  const ai = getAI();
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
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an experienced dairy veterinarian, provide advice based on these cattle health/milk logs: ${healthLogs}`,
  });
  return response.text;
};
