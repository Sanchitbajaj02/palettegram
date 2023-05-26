import logo from "../logo.svg";

const Navbar = () => {
  const settingRedirect = () => {
    console.log("redirecting to setting");
  };
  return (
    <nav className="navbar sticky  top-0 shadow-md bg-[#ffff] px-4 py-2 ">
      <div className="flex  items-center content-center justify-between h-12">
        <img
          className="navbar-brand fw-bold w-10 h-10 cursor pointer mx-4"
          src={logo}
          alt="settings"
        />
        <i
          className="fa fa-gear fa-2x cursor-pointer mx-4"
          onClick={settingRedirect}
        ></i>
      </div>
    </nav>
  );
};
export default Navbar;
