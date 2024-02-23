import { AlertTriangle } from "lucide-react";

interface iProps {
 children: React.ReactNode;

}

const Banner = ({children}:iProps) => {

return(
<div className={`bg-yellow-200 font-medium ps-3 py-2 flex items-center gap-x-2 `} >
  <AlertTriangle size={20} className="text-yellow-700" />
  {children}
</div>
)
}
export default Banner;