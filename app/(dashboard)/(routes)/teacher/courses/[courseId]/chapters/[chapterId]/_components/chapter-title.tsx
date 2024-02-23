"use client"
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Chapter } from "@prisma/client";
interface iProps {
  initialData: Chapter  & {muxData: { id: string; assestId: string; playbackId: string | null; chapterId: string; } | null}
  courseId: string;
  chapterId:string
}
const fromSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const ChapterTitleForm = ({ initialData, courseId,chapterId }: iProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      title : initialData?.title || '' },
  });

  const [isEditing, setIsEditing] = useState(false);
  const editToggle = () => setIsEditing((prev) => !prev);

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    try{
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values)
      toast.success('chapter updated')
      editToggle()
      router.refresh()
    }catch{
      toast.error('something went wrong')
    }
  };
  console.log(isEditing);
  
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        chapter Title
        <Button onClick={editToggle} variant="ghost" >
          {isEditing ? (
            <>cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
          <p className="text-sm mt-2">
            {initialData.title}
          </p>
        )}
        {isEditing && (
          <Form {...form}>
            <form 
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
              control={form.control}
              name="title"
              render={({field})=>(
                <FormItem>
                <FormControl>
                  <Input 
                  disabled={isSubmitting}
                  placeholder="e.g advanced web development "
                  {...field}
                  />
                </FormControl>
              </FormItem>
              )}
              />
              <div
              className="flex items-center gap-x-1">
                <Button type="submit" disabled={isSubmitting ||!isValid}>Save</Button>
              </div>
            </form>
          </Form>
        )}
    </div>
  );
};
export default ChapterTitleForm;
