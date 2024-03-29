import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse('NotFound', { status: 404 });
    }
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });
    
    const muxData = await db.muxData.findUnique({
      where: {
        chapterId,
      },
    });
    if(!muxData || !chapter || !chapter.title|| !chapter.description || !chapter.videoUrl){
      return new NextResponse('CHAPTER_INCOMPLETE ,missing required fields', { status: 400 });
    }
    const publishedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished:true
      },
    });
    return NextResponse.json(publishedChapter, { status: 200 });
  } catch  {
    return new NextResponse("CHAPTER_PUBLISH_ERROR", { status: 500 });
  }
}