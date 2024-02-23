"use client";
import * as z from "zod";
import axios from "axios";
import MuxPlayer from '@mux/mux-player-react'
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Chapter } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";
interface iProps {
  initialData: Chapter & { muxData: { id: string; assestId: string; playbackId: string | null; chapterId: string } | null }
  courseId: string;
  chapterId: string
}
const fromSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "image is required",
  }),
});

const ChapterVideoForm = ({ initialData, courseId ,chapterId}: iProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const editToggle = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    console.log(values);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("chapter updated");
      editToggle();
      router.refresh();
    } catch {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course video
        <Button onClick={editToggle} variant="ghost">
          {isEditing && (
            <>cancel</>
          ) }
          {!isEditing && initialData.videoUrl &&  (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2 " />
              Add an video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId  || '' }
              
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endPoint="videoChapter"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video does not appear.
        </div>
      )}
    </div>
  );
};
export default ChapterVideoForm;
