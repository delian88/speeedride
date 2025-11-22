import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatResponse = async (message: string, context: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: `You are a helpful customer support assistant for Speedride, a taxi app. 
        Context: ${context}. 
        Keep answers short, friendly, and helpful. 
        If the user asks about a specific ride, ask for the ride ID.`
      }
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server. Please try again.";
  }
};

export const estimateRideDetails = async (pickup: string, dropoff: string): Promise<{
  distance: string;
  duration: string;
  priceStandard: number;
  pricePremium: number;
  priceXL: number;
}> => {
  try {
    const prompt = `Estimate the driving distance, duration, and prices for a taxi ride from "${pickup}" to "${dropoff}".
    Return ONLY a JSON object with keys: distance (string, e.g. '5.2 km'), duration (string, e.g. '15 min'), priceStandard (number), pricePremium (number), priceXL (number).
    Assume standard pricing is roughly $1.5 per km + $3 base. Premium is 1.5x, XL is 2x.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Estimation Error:", error);
    // Fallback mock data
    return {
      distance: '3.5 km',
      duration: '12 min',
      priceStandard: 12.50,
      pricePremium: 18.75,
      priceXL: 25.00
    };
  }
};
