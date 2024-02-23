import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});
export async function DELETE(req:Request,
  {params}:{params:{courseId:string;}}){
    try{
      const {userId} = auth()
      const {courseId} = params
      if(!userId){
        return new NextResponse('not autharized', {status:401})
      }
      const ownCourse = await db.course.findUnique({
        where:{
          id:courseId,
          userId
        },
        include:{
          chapters:{
            include:{
              muxData:true
            }
          }
        }
      })
      if(!ownCourse){
        return new NextResponse('not found', {status:404})
      }
      for(const chapter of ownCourse.chapters){
        if(chapter.muxData?.assestId){
          await video.assets.delete(chapter.muxData.assestId)
        }
      }
      const deletedCourse = await db.course.delete({
        where:{
          id:courseId
        }
      })
      return NextResponse.json(deletedCourse)
    }catch(error){
      console.log("[COURSE_ID]",error)
      return new NextResponse('internal error ' ,{status:500})
    }
  }
export async function PATCH(
  req:Request,
  {params}:{params:{courseId:string}}){
  try{
    const {userId} = auth()
    const {courseId} = params
    if(!userId){
      return new NextResponse('not autharized', {status:401})
    }
    const values = await req.json()
    const course = await db.course.update({
      where:{
        id:courseId,
        userId
      },
      data:{
        ...values
      }
    })
    return  NextResponse.json(course)
  }catch (error){
    console.log("[COURSE_ID]",error)
    return new NextResponse('internal error ' ,{status:500})
  }
}