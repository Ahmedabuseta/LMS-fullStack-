import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = ()=>{
  const {userId} = auth()
  if(!userId){
    throw new UploadThingError('not autharized')
  }
  return {userId}
}
export const ourFileRouter = {
  courseImage:f({image:{maxFileCount:1,maxFileSize:'4MB'}})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),
  courseAttchment:f(['text','pdf', 'audio','video','image'])
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),
  videoChapter:f({video:{maxFileCount:1,maxFileSize:'512GB'}})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;