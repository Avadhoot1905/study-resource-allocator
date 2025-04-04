'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

interface RoadmapData {
  nodes: Array<{
    id: string;
    type?: string;
    data: { label: string };
    position: { x: number; y: number };
    style: {
      background: string;
      color: string;
      border: string;
      width: number;
    };
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    animated?: boolean;
  }>;
}

export async function generateRoadmap(
  subject: string,
  level: string
): Promise<RoadmapData> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
    Create a detailed study roadmap for ${subject} at ${level} level.
    
    Return the data ONLY as a valid JSON object with two arrays:
    1. 'nodes' array with objects having: id (string), data (object with label), position (object with x,y coordinates), and style (object with background, color, border, width)
    2. 'edges' array with objects having: id (string), source (string), target (string), and animated (boolean)
    
    The nodes should include:
    - the subdivisions of the subject as nodes
    - the connections between them as edges
    - try making it as detailed as possible
    - use different colours as per the hierarchy
    
    Example format:
    {
      "nodes": [
        {
          "id": "1",
          "type": "input",
          "data": { "label": "Main Topic" },
          "position": { "x": 250, "y": 5 },
          "style": { "background": "#3b82f6", "color": "white", "border": "1px solid #2563eb", "width": 180 }
        }
      ],
      "edges": [
        { "id": "e1-2", "source": "1", "target": "2", "animated": true }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Roadmap generation failed:", error);
    throw new Error("Failed to generate roadmap. Please try again.");
  }
}