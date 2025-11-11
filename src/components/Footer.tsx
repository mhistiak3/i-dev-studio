import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-border relative mt-auto">
      <div className="absolute inset-x-0 -top-px hpx bg-linear-to-r from-dark to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-2 text-light/40">
            <span>© 2025 iDevStudio | Alright Reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href={"support"}
              className="text-light/40 hover:text-light transition-colors"
            >
              Support
            </Link>
            <Link
              href={"privacy"}
              className="text-light/40 hover:text-light transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={"terms"}
              className="text-light/40 hover:text-light transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
