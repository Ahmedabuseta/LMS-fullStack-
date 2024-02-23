import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { title} = await req.json();
    
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return new NextResponse(JSON.stringify(course), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("[Courses]", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
