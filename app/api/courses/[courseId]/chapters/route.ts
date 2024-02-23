import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = auth();
  const courseId = params.courseId;
  const { title } = await req.json();
  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: { createdAt: "desc" },
    });
    const newPostion = lastChapter ? lastChapter.postion + 1 : 1;
    const chapter = await db.chapter.create({
      data: {
        courseId,
        title,
        postion: newPostion,
      },
    });
    return NextResponse.json(chapter);
  } catch (erro) {
    return new NextResponse("ernternal err", { status: 500 });
  }
}
