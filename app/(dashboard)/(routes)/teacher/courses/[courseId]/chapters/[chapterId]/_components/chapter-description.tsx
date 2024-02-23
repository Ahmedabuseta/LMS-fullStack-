"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { TextEditor } from "@/components/TextEditor";
import { TextPreview } from "@/components/TextPreview";
interface iProps {
  initialData: Chapter & {
    muxData: {
      id: string;
      assestId: string;
      playbackId: string | null;
      chapterId: string;
    } | null;
  };
  courseId: string;
  chapterId: string;
}
const fromSchema = z.object({
  description: z.string().min(1, {
    message: "description is required",
  }),
});

const DescriptionChapter = ({ initialData, courseId, chapterId }: iProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const editToggle = () => setIsEditing((prev) => !prev);

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    console.log(values);
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      editToggle();
      router.refresh();
    } catch {
      toast.error("something went wrong");
    }
  };
  console.log(isEditing);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter description
        <Button onClick={editToggle} variant="ghost">
          {isEditing ? (
            <>cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-700 italic"
          )}
        >
          {initialData.description ? (
            <TextPreview value={initialData.description} />
          ) : (
            "No   description"
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextEditor {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-1">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
export default DescriptionChapter;
