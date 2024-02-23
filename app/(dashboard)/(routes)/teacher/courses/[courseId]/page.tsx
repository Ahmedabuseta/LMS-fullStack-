import { IconBadge } from "@/components/badge-icon";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_component/TitleForm";
import DescriptionForm from "./_component/descriptionForm";
import ImageForm from "./_component/ImageForm";
import CategoeryForm from "./_component/CategoeryForm";
import { PriceForm } from "./_component/PriceForm";
import AttchmentForm from "./_component/AttchmentForm";
import ChapterForm from "./_component/ChapterForm";
import CourseActions from "./_component/course-actions";
import Banner from "@/components/Banner";

interface iProps {
  params: { courseId: string };
}

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          postion: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const categories = await db.categoery.findMany({
    orderBy: {
      name: "asc",
    },
  });
  if (!course) redirect("/teacher/courses");
  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoeryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `Your course is (${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
    <Banner>
      <h1>Complete all field to publish your course</h1>
    </Banner>
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup </h1>
            <span className="text-sm text-slate-700">
              comple all field {completionText}
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            isPublished={course.isPublished}
            courseId={course.id}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
          <div>
            <div className="flex items-center  w-screen gap-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoeryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapter</h2>
              </div>
              <div>
                <ChapterForm initialData={course} courseId={course.id} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
              <AttchmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseIdPage;
