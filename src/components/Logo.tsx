import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="bg-dark rounded-md flex items-center gap-x-3 px-2 py-2 w-fit cursor-pointer"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={30}
        height={30}
        className="rounded-md"
      />
      <span className="text-white font-bold text-lg">iDevStudio</span>
    </Link>
  );
};

export default Logo;
