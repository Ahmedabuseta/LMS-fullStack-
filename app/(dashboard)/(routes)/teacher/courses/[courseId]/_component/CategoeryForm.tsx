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
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/Combobox";
interface iProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}
const fromSchema = z.object({
  categoeryId: z.string().min(1),
});

const CategoeryForm = ({ initialData, courseId, options }: iProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      categoeryId: initialData?.categoeryId || "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const editToggle = () => setIsEditing((prev) => !prev);

  const { isSubmitting, isValid } = form.formState;
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
  const selectedOption = options.find((option)=>option.value === initialData.categoeryId)
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course categoery
        <Button onClick={editToggle} variant="ghost">
          {isEditing ? (
            <>cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit categoery
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoeryId && "text-slate-700 italic"
          )}
        >
          {selectedOption?.label || "Add a categoery"}
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
           name="categoeryId"
           render={({ field }) => (
             <FormItem>
               <FormControl>
                 <Combobox
                   options={options}
                   {...field}
                 />
                 
               </FormControl>
               <FormMessage />
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
export default CategoeryForm;
