"use client";
import HeaderProfile from "@/app/editor/_components/HeaderProfile";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-dark">
      <div className="container">
        <nav className="flex justify-between items-center">
          <Logo />

          <HeaderProfile />
        </nav>
      </div>
    </header>
  );
};

export default Header;
