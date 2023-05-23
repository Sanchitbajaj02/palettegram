import React from "react";
import logo from "../logo.svg";

const Navbar = () => {
  return (
    <nav>
      <div class="flex border items-center justify-between px-4">
        <img class="w-10 h-10" src={logo} alt="logo" />
        <img class="w-10 h-10" src={logo} alt="settings" />
      </div>
    </nav>
  );
};
export default Navbar;
