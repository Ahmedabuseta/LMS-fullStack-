import { ReactNode } from "react";

interface iProps {
 children:ReactNode
}

const AuthLayout = ({children}:iProps) => {

return(
<div className="flex items-center justify-center h-full bg-gray-100">
{children}
</div>
)
}
export default AuthLayout;