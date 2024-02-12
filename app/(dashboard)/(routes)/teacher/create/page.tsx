'use client'
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormDescription,
  FormItem
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { error } from "console";
const formSchema = z.object({
  title: z.string().min(1,{
    message:"Title is required"})
})
interface iProps {
 
}

const CreateCoursePage = ({}:iProps) => {
  const router = useRouter()
 const form = useForm<z.infer<typeof formSchema>>({
  resolver:zodResolver(formSchema),
  defaultValues:{
    title:""
  },
})

const { isSubmitting ,isValid}  = form.formState;
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {

    const response = await axios.post('/api/courses', values);

    // Assuming `response.data.id` is available
    router.push(`/teacher/courses/${response.data.id}`);
    
    // Display a success toast
    toast.success('Course created successfully');
  } catch (error) {
    // Extract specific error information for a more informative toast message
    const errorMessage = 'Failed to create course';

    // Display an error toast
    toast.error(errorMessage);
  }
};

return(
<div className="max-w-5xl flex flex-col md:items-center md:justify-center p-6 h-full  mx-auto">
  <h1 className="text-2xl">
    Name your Course
  </h1>
  <Form {...form} >
  <form
  className="space-y-8 mt-8 "
  onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
    control={form.control}
    name="title"
    render={({field})=>(
      <FormItem>
        <FormLabel>
          Course title
        </FormLabel>
          <Input 
          disabled={isSubmitting}
          placeholder="e.g advanced web development"
          {...field}
          />
          <FormDescription>
            what will you tech in this course?
          </FormDescription>
          <FormMessage />
      </FormItem>
    )}/>
    <div className="flex gap-x-2 ">
      <Button
      type="button"
      variant='ghost'>
        cancel
      </Button>
      <Button
      type="submit"
      disabled={!isValid || isSubmitting}
      >
        Continue
      </Button>

    </div>
  </form>
  </Form>
  
</div>
)
}
export default CreateCoursePage;