import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="bg-dark rounded-md flex items-center gap-x-3 sm:pr-4 sm:pl-2 sm:py-2 p-2 w-fit cursor-pointer"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={30}
        height={30}
        className="rounded-md"
      />
      <span className="text-white font-bold text-lg hidden sm:inline-block">
        iDevStudio
      </span>
    </Link>
  );
};

export default Logo;
