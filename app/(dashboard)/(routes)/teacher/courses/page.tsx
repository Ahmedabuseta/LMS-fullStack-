"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface iProps {
  //   name: string;
}

const CoursesPage = ({}: iProps) => {
  return (
    <div className="p-6 ">
      <Link href="/teacher/create">
        <Button>New course</Button>
      </Link>
    </div>
  );
};
export default CoursesPage;
