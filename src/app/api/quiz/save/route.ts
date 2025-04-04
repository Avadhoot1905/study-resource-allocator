import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, topic, difficulty, questions, answers, score, timeTaken } = await req.json();

  try {
    const quiz = await prisma.quiz.create({
      data: {
        userId: session.user?.email ?? "",
        title,
        topic,
        difficulty,
        questions,
        answers,
        score,
        timeTaken,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error saving quiz:", error);
    return NextResponse.json(
      { error: "Failed to save quiz" },
      { status: 500 }
    );
  }
}