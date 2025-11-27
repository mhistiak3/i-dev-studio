import HeaderProfile from "@/app/editor/_components/HeaderProfile";

import Logo from "./Logo";
import NavigateLink from "./NavigateLink";

function NavigationHeader() {
  return (
    <header className="sticky top-0">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Logo */}
        <Logo />

        <NavigateLink href="/editor" label="Editor" />
        <NavigateLink href="/snippets" label="Snippets" />
      </div>
      <div>
        <HeaderProfile />
      </div>
    </header>
  );
}

export default NavigationHeader;
