import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT (req:Request,
  {params}:{params:{courseId:string}}){

    try{
      const {userId} = auth();
      const {courseId} = params;
      const {list} = await req.json();
      if(!userId){
        return new NextResponse("UNAUTHORIZED", {status: 401})
      }
      const ownCourse = await db.course.findUnique({
        where:{
          id: courseId,
          userId
        }
      })
      if(!ownCourse){
        return new NextResponse("NOT_FOUND", {status: 404})
      }
      for (let item of list){
        await db.chapter.update({
          where:{
            id: item.id
          },
          data:{
            postion: item.postion
          }
        })
      }
      return new NextResponse("OK", {status: 200})
    }catch(error){
      return new NextResponse("CHAPTERS_ERROR", {status: 500})
    }
  }