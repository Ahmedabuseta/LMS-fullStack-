"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import FileUpload from "@/components/FileUpload";
interface iProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}
const fromSchema = z.object({
  url: z.string().min(1),
});

const AttchmentForm = ({ initialData, courseId }: iProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const editToggle = () => setIsEditing((prev) => !prev);
  const [deletingId, setDeleteingId] = useState<string | null>(null);
  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    console.log(values);
    try {
      await axios.post(`/api/courses/${courseId}/attchments`, values);
      toast.success("course updated");
      editToggle();
      router.refresh();
    } catch {
      toast.error("something went wrong");
    }
  };
  const onDeleting = async (id: string) => {
    setDeleteingId(id);
    console.log(id);

    try {
      await axios.delete(`/api/courses/${courseId}/attchments/${id}`);
      toast.success("attchment deleted");
      router.refresh();
    } catch {
      toast.error("something went wrong");
    } finally {
      setDeleteingId(null);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachment & Resourses
        <Button onClick={editToggle} variant="ghost">
          {isEditing && <>cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2 " />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (initialData.attachments.length === 0 ? (
          <p className="itaclic text-sm text-slate-500">no attchments yet</p>
        ) : (
          <>
            {initialData.attachments.length > 0 &&
              initialData.attachments.map((attchment) => (
                <div
                  key={attchment.id}
                  className="flex mb-2 items-center p-3 w-full bg-sky-100 border rounded-md text-sky-700 border-sky-200"
                >
                  <File className="w-4 h-4 -4  mr-2 flex-s" />
                  <p className="text-xs line-clamp-1">{attchment.name}</p>
                  {deletingId === attchment.id ? (
                    <div className="ml-auto">
                      <Loader2 className="animate-spin tranistion h-4 w-4" />
                    </div>
                  ) : (
                    <button
                      onClick={() => onDeleting(attchment.id)}
                      className="ml-auto hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
          </>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endPoint="courseAttchment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
export default AttchmentForm;
