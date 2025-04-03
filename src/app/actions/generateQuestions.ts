'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  difficulty: string;
  explanation?: string;
}

export async function generateQuestions(
  topic: string,
  count: number,
  difficulty: string = "medium"
): Promise<GeneratedQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
    Generate exactly ${count} multiple-choice questions about ${topic} at ${difficulty} difficulty.
    For each question, provide:
    - Clear question text
    - 4 plausible options (a, b, c, d)
    - Correct answer
    - Brief explanation (1 sentence)
    - Difficulty level
    
    Format as JSON exactly like this:
    [
      {
        "question": "What is...?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "Option 3",
        "topic": "${topic}",
        "difficulty": "${difficulty}",
        "explanation": "Brief explanation why this is correct"
      }
    ]
    
    Return ONLY valid JSON. No additional text or markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Question generation failed:", error);
    throw new Error("Failed to generate questions. Please try again.");
  }
}