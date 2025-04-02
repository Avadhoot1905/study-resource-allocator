// app/actions/generateQuestions.ts
'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

export async function generateQuestions(topic: string, count: number) {
  try {
    // Validate input
    if (!topic.trim() || count <= 0) {
      throw new Error("Invalid input parameters");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
    Generate exactly ${count} multiple-choice questions about ${topic}.
    Format each question exactly like this JSON example:
    
    [
      {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "correctAnswer": "Paris",
        "topic": "${topic}"
      }
    ]
    
    Return ONLY the JSON array, nothing else. No explanations, no markdown. Make the questions moderately difficult to difficult.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // More robust JSON extraction
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid response format from API");
    }

    const jsonString = text.slice(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonString);

    // Validate response structure
    if (!Array.isArray(parsed) || parsed.length !== count) {
      throw new Error("Invalid question format received");
    }

    return parsed;
  } catch (error) {
    console.error("Question generation failed:", error);
    throw new Error("Failed to generate questions. Please try again later.");
  }
}