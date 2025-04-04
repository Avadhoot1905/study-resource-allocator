import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, subject, level, nodes, edges } = await req.json();

  try {
    const roadmap = await prisma.roadmap.create({
      data: {
        userId: session.user?.email ?? "",
        title,
        subject,
        level,
        nodes,
        edges,
      },
    });

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Error saving roadmap:", error);
    return NextResponse.json(
      { error: "Failed to save roadmap" },
      { status: 500 }
    );
  }
}