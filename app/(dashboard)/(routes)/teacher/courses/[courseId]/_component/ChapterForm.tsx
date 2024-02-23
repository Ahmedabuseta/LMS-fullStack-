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
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { ChapterList } from "./ChapterList";
import { Input } from "@/components/ui/input";
interface iProps {
  initialData: Course & { chapters : Chapter[]};
  courseId: string;
}
const fromSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
});

const ChapterForm = ({ initialData, courseId }: iProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      title : ""},
  });
  const [isCreating , setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreate = () => setIsCreating((prev) => !prev);

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    console.log(values);
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("course updated");
      toggleCreate();
      router.refresh();
    } catch {
      toast.error("something went wrong");
    }
  };
  const onReOrder = async (updatedData:{id: string, position: number}[]) => {
    try{
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {list:updatedData});
      toast.success("course updated");
      router.refresh();
    }catch{
      toast.error("something went wrong");
    }finally{
      setIsUpdating(false)
    }
  }
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  }
  return (
    <div className=" relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreate} variant="ghost">
          {isCreating ? (
            <>cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            initialData.chapters.length === 0 && "text-slate-700 italic"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          <ChapterList
          onEdit={onEdit}
          onReOrder={onReOrder}
          items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-slate-800 text-muted-foregroung mt-4">
          Drag and drop to reorder chapters
        </p>
      )} 
      {isCreating && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g bout your course "
                      {...field}
                    />
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
export default ChapterForm;
