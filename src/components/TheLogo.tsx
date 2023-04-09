import Image from "next/image";
const image = require("../../public/images/logo.png");
export default function TheLogo() {
  return (
    <div>
      <Image src={image} alt="logo" width={50} height={50} />
    </div>
  );
}
