"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "react-feather";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();

    router.push("/");
  };

  const userAuth = useSelector((state: any) => state.authenticator);

  return (
    <nav className="w-full sticky top-0 shadow-md bg-[#ffff] px-4 py-2 ">
      <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between  h-12">
        <Link href={userAuth?.userId ? "/feed" : "/"}>
          <Image
            className="navbar-brand fw-bold w-10 h-10 cursor pointer mx-4"
            src={"/assets/logo.png"}
            alt="settings"
            width={100}
            height={100}
          />
        </Link>

        <div className="flex gap-10">
          <Link href={`/user/${userAuth?.userId}`}>
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
