import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {

  try{
    const {userId} = auth();
    const {courseId} = params;
     if(!userId){
      return new NextResponse('Unauthorized', { status: 401 });
     }
     const owneredCourse = await db.course.findUnique({
      where:{
        id:courseId,
        userId
      }
     })
     if(!owneredCourse){
      return new NextResponse('Not Found', { status: 404 });
     }
     const {url} = await req.json();
     const attachment = await db.attachment.create({
      data:{
        courseId,
        url,
        name:url.split('/').pop()
      }
     })
     return NextResponse.json(attachment)
  }catch(error){
    console.error("[Courses]", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
