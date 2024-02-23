import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { courseId } = params;

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
    const chapter = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
      }
    });
    const attachment = await db.attachment.findMany({
      where: {
        courseId: params.courseId,
      }
    });
    
    if( !ownCourse.imageUrl || !ownCourse.title|| !ownCourse.description || !ownCourse.price || !attachment.length || !chapter.length){
      return new NextResponse('COURSE_INCOMPLETE ,missing required fields', { status: 400 });
    }
    const publishedCourse = await db.course.update({
      where: {
        id:
        courseId,
      },
      data: {
        isPublished:true
      },
    });
    return NextResponse.json(publishedCourse, { status: 200 });
  } catch  {
    return new NextResponse("CHAPTER_PUBLISH_ERROR", { status: 500 });
  }
}