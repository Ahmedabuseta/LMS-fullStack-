import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attchmentId:string } }
) {

  try{
    const {userId} = auth();
    const {courseId , attchmentId} = params;
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
     const attchment = await db.attachment.delete({
      where:{
        id:attchmentId,
        courseId: courseId,
      }
     })
     return NextResponse.json(attchment)
  }catch(error){
    console.error("[Courses]", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
