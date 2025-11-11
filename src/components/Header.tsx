import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-dark">
      <div className="container">
        <nav className="flex justify-between items-center">
          <Logo />
          <button>Register</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
