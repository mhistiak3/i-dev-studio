import Link from "next/link";
import { LuFileCode2 } from "react-icons/lu";

const NavigateLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-light bg-dark/50 hover:bg-primary/10 
              border border-border hover:border-primary/50 transition-all duration-300 shadow-lg overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-linear-to-r from-primary/10 
              to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <LuFileCode2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform hidden sm:block" />
      <span className="text-sm font-medium relative z-10 group-hover:text-light transition-colors">
        {label}
      </span>
    </Link>
  );
};

export default NavigateLink;
