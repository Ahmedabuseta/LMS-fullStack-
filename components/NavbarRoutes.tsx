"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

interface iProps {}

const NavbarRoutes = ({}: iProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isTeacherPage = pathName?.startsWith("/teacher");
  const isPlayerPage = pathName?.includes("/chapter");
  const isSearchPage = pathName?.includes("/search");

  return (
    <>
    <div className="hidden md:flex items-center ">
      <SearchInput />
    </div>
    <div className="flex ml-auto gap-x-2">
      {isTeacherPage || isPlayerPage ? (
        <Button size='sm' variant="ghost" onClick={() => router.push("/")}>
          <LogOut className="h-4 w-4 mr-2" />
          Exit
        </Button>
      ) : (
        <Link href="/teacher/courses">
          <Button size='sm' variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton 
      afterSignOutUrl="/"
      />
    </div>
  </>);
};
export default NavbarRoutes;
