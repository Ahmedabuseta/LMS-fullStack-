import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

interface iProps {
 
}

const MobileSidebar = ({}:iProps) => {

return(
  <Sheet>
    <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
      <Menu/>
    </SheetTrigger>
    <SheetContent side='left' className='bg-white p-0'>
      <Sidebar/>
    </SheetContent>
  </Sheet>

)
}
export default MobileSidebar;