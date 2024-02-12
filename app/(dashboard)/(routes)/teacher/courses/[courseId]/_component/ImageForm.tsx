"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";
interface iProps {
  initialData: Course;
  courseId: string;
}
const fromSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "image is required",
  }),
});

const ImageForm = ({ initialData, courseId }: iProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const editToggle = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    console.log(values);
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("course updated");
      editToggle();
      router.refresh();
    } catch {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={editToggle} variant="ghost">
          {isEditing && (
            <>cancel</>
          ) }
          {!isEditing && initialData.imageUrl &&  (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2 " />
              Add an image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="uploaded"
              fill
              className="obej-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endPoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ImageForm;
