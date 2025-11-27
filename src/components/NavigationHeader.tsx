import HeaderProfile from "@/app/editor/_components/HeaderProfile";

import Link from "next/link";
import { BiCode } from "react-icons/bi";
import { LuFileCode2 } from "react-icons/lu";
import Logo from "./Logo";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/50 bg-dark/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-primary/10" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Logo */}
            <Logo />

            {/* snippets Link */}
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-light bg-dark/50 hover:bg-primary/10 
              border border-border hover:border-primary/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-primary/10 
              to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <LuFileCode2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform hidden sm:block" />
              <span className="text-sm font-medium relative z-10 group-hover:text-light transition-colors">
                Snippets
              </span>
            </Link>
            {/* editor link */}
            <Link
              href="/editor"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-light bg-dark/50 hover:bg-primary/10 
              border border-border hover:border-primary/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-primary/10 
              to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <BiCode className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform hidden sm:block" />
              <span className="text-sm font-medium relative z-10 group-hover:text-light transition-colors">
                Editor
              </span>
            </Link>
          </div>

          {/* right rection */}
          <div>
            <HeaderProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
