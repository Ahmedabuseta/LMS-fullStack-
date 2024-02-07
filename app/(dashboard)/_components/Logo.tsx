import Image from "next/image";

interface iProps {
 //   name: string;
}

const Logo = ({}:iProps) => {

return(
<Image 
height={130}
width={130}
alt="logo"
src="/logo.svg"
/>
  )
}
export default Logo;