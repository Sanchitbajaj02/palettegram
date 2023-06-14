import Logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "react-feather";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  const userAuth = useSelector((state) => state.authenticator);

  return (
    <nav className="w-full sticky top-0 shadow-md bg-[#ffff] px-4 py-2 ">
      <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between  h-12">
        <Link to={userAuth.userId ? "/feed" : "/"}>
          <img
            className="navbar-brand fw-bold w-10 h-10 cursor pointer mx-4"
            src={Logo}
            alt="settings"
          />
        </Link>

        <div className="flex gap-10">
          <Link to={`/user/${userAuth.userId}`}>
            <Settings />
          </Link>

          <div onClick={logout} className="cursor-pointer">
            <LogOut />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
