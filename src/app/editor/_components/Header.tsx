import Logo from "@/components/Logo";
import NavigateLink from "@/components/NavigateLink";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { LuFileCode } from "react-icons/lu";
import HeaderProfile from "./HeaderProfile";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import ThemeSelector from "./ThemeSelector";

const Header = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  return (
    <header>
      <div className="flex items-center gap-8">
        <Logo />
        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavigateLink href="/snippets" label="Snippets" Icon={LuFileCode} />
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
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
