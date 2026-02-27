import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// Depending on environment (client/server), the API key should be handled carefully.
// This is a basic setup to use in server actions or API routes.
export const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
