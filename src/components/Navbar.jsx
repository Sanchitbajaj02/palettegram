import logo from "../logo.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="flex border items-center justify-between px-4">
        <img className="w-10 h-10" src={logo} alt="logo" />
        <img className="w-10 h-10" src={logo} alt="settings" />
      </div>
    </nav>
  );
};
export default Navbar;
