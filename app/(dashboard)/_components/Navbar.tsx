import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

interface iProps {
 //   name: string;
}

const Navbar = ({}:iProps) => {

return(
<div className="p-4 w-full bg-white border-b  h-full flex items-center gb-white">
<MobileSidebar />
<NavbarRoutes/>
</div>
)
}
export default Navbar;