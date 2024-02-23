import { IconBadge } from "@/components/badge-icon";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  Eye,
  LayoutDashboard,
  ListChecks,
  Video,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "../../_component/TitleForm";
import DescriptionForm from "../../_component/descriptionForm";
import ChapterForm from "../../_component/ChapterForm";
import ChapterTitleForm from "./_components/chapter-title";
import DescriptionChapter from "./_components/chapter-description";
import ChapterAccess from "./_components/chapter-access";
import ChapterVideoForm from "./_components/chapter-video";
import ChapterActions from "./_components/chapter-actions";

interface iProps {
  params: { courseId: string; chapterId: string };
}

const ChapterIdPage = async ({ params }: iProps) => {
  const { userId } = auth();
  const { chapterId, courseId } = params;
  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) redirect("/teacher/chapters");
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `Your chapter is (${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <div className=" p-6 ">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">chapter setup </h1>
          <span className="text-sm text-slate-700">
            complete all field {completionText}
          </span>
        </div>
        <ChapterActions 
        isPublished={chapter.isPublished}
        disabled={!isComplete}
        courseId={courseId}
        chapterId={chapter.id}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
        <div className="space-y-4">
          <div>
            <div className="flex items-center  w-screen gap-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapter.id}
            />
            <DescriptionChapter
              initialData={chapter}
              courseId={courseId}
              chapterId={chapter.id}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Chapter access</h2>
              </div>
              <div>
                <ChapterAccess
                  initialData={chapter}
                  courseId={courseId}
                  chapterId={chapter.id}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">Add a video</h2>
          </div>
          <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
        </div>
      </div>
    </div>
  );
};
export default ChapterIdPage;
