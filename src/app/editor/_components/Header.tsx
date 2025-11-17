import Logo from "@/components/Logo";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import Link from "next/link";
import { LuFileCode2 } from "react-icons/lu";
import { api } from "../../../../convex/_generated/api";
import HeaderProfileBtn from "./HeaderProfile";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import ThemeSelector from "./ThemeSelector";

const Header = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <header className="relative z-10">
      <div
        className="flex items-center lg:justify-between justify-center 
        bg-black/80 backdrop-blur-xl p-6 mb-4 rounded-lg"
      >
        <div className="hidden lg:flex items-center gap-8">
          <Logo />
          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-light/90 bg-dark/95 
                hover:bg-dark border border-dark hover:border-primary transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-primary/10 
                to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <LuFileCode2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span
                className="text-sm font-medium relative z-10 group-hover:text-light
                 transition-colors"
              >
                Snippets
              </span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector />
          </div>

          <SignedIn>
            <RunButton />
          </SignedIn>
          <div className="pl-3 border-l border-gray-800">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
