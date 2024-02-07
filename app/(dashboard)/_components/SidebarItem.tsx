import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface iProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: iProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isActive =
    (pathName === "/" && href === "/") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };
  return (
    <button
    onClick={onClick}
      className={cn(
        "flex gap-x-2 items-center  w-full pl-6 text-slate-500 hover:text-slate-600 text-sm font-[500] transion-all hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 hover:text-sky-700 bg-sky-200/20 hover:bg-sky-200/20"
      )}
    >
      <div className="flex items-center  gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-400", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto border-2 h-16  opacity-0 transition-all border-sky-700 ",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
export default SidebarItem;
