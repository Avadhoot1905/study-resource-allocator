'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

interface RoadmapNode {
  id: string;
  type?: string;
  data: { label: string };
  position: { x: number; y: number };
  style: { background: string; color: string; border: string; width: number };
}

interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export async function generateRoadmap(subject: string, level: string = "beginner") {
  if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Create a detailed study roadmap for ${subject} at ${level} level.
  
  Return the data ONLY as a valid JSON object with two arrays:
  1. 'nodes' array with objects having: id (string), data (object with label), position (object with x,y coordinates), and style (object with background, color, border, width)
  2. 'edges' array with objects having: id (string), source (string), target (string), and animated (boolean)
  
  The nodes should include:
  - 1 main topic node at the top (style with blue background)
  - 3-5 subtopic nodes (style with green background)
  - 2-3 resource nodes per subtopic (style with purple background)
  - 1 final project/output node at the bottom (style with orange background)
  
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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
    const jsonData = JSON.parse(jsonMatch?.[1] || jsonMatch?.[0] || text) as {
      nodes: RoadmapNode[];
      edges: RoadmapEdge[];
    };

    return jsonData;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error("Failed to generate roadmap. Please try again.");
  }
}