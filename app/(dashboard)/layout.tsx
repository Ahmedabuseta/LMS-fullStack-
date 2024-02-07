import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

interface iProps {
 children:ReactNode;
}

const DashboardLayout = ({children}:iProps) => {

return(
<div className="h-full ">
  <div className="md:pl-56 fixed inset-y-0 z-50 w-full  border-b-2  h-[80px] flex ">
  <Navbar/>
  </div>
  <div className="w-56 hidden md:flex  z-50 flex-col h-full bg-white fixed inset-y-0 overflow-y-auto">
    <Sidebar />
  </div>
  <main className="md:pl-56 h-full pt-[80px]">
    {children}
  </main>

</div>
)
}
export default DashboardLayout;