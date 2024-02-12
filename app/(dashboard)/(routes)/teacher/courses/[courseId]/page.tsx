
import { IconBadge } from "@/components/badge-icon";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_component/TitleForm";
import DescriptionForm from "./_component/descriptionForm";
import ImageForm from "./_component/ImageForm";

interface iProps {
  params: { courseId: string };
}

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/");
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!course) redirect("/teacher/courses");
  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoeryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `Your course is (${completedFields}/${totalFields})`;
  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup </h1>
          <span className="text-sm text-slate-700">comple all field {completionText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
        <div className="flex items-center  w-screen gap-2">
          <IconBadge icon={LayoutDashboard}/>
          <h2 className="text-xl">
            Customize your course
          </h2>
        </div>
        <TitleForm 
        initialData={course}
        courseId={course.id}
        />
        <DescriptionForm 
        initialData={course}
        courseId={course.id}
        />
        <ImageForm
        initialData={course}
        courseId={course.id}
        />
      </div>
    </div>
  );
};
export default CourseIdPage;
