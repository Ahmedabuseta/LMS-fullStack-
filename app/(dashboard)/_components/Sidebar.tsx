import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

interface iProps {
}

const Sidebar = ({}:iProps) => {

return(
<div className="h-full border-r flex flex-col bg-wite shadow-sm w-full">
  <div className="p-6">
    <Logo />
  </div>
  <div className="flex flex-col w-full">
    <SidebarRoutes/>
  </div>
</div>
)
}
export default Sidebar;