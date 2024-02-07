"use client"

import { BarChart, Compass, Layout, List, ListIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

interface iProps {
 
}
const guestRoutes =[
  {
    icon:Layout,
    label:"Dashboard",
    href:'/'
  },
  {
    icon:Compass,
    label:"Browse",
    href:'/search'
  }
]
const teacherRoutes= [
  {
    icon:ListIcon,
    label:"courses",
    href:'/teacher/courses'
  },
  {
    icon:BarChart,
    label:"Analytics",
    href:'/teacher/analytics'
  }
]

const SidebarRoutes = ({}:iProps) => {
  const pathName = usePathname()
  const IsTeacherPage = pathName?.includes("/teacher")
const routes = IsTeacherPage ? teacherRoutes : guestRoutes
return(
<div >
  {routes.map( (route) => (
    <SidebarItem 
    key={route.href}
    icon={route.icon}
    href={route.href}
    label={route.label}
    />
  ))}

</div>
)
}
export default SidebarRoutes;