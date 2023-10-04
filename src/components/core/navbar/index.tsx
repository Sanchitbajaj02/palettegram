"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Settings, LogOut, Home } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/backend/auth.api";
import { logUserOut } from "@/redux/reducers/authReducer";
import ThemeButton from "@/components/core/themeButton";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const userAuth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const logout = async () => {
    localStorage.clear();
    await logoutUser();

    dispatch(logUserOut());

    router.push("/");
  };

  if (userAuth.error) {
    return <h1>Error</h1>;
  }

  if (userAuth.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <nav className="w-full sticky top-0 shadow-md py-2 dark:shadow-gray-600">
      <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between  h-12">
        <Link href={userAuth.creds?.userId ? "/feed" : "/"}>
          <Image
            className="navbar-brand fw-bold w-10 h-10 cursor pointer mx-4 "
            src={"/assets/logo.png"}
            alt="settings"
            width={100}
            height={100}
          />
        </Link>

        <div className="flex gap-2 flex-row items-center">
          <ThemeButton iconSize={22} />
          {pathname !== "/feed" && (
            <Link href="/feed" className="mx-2 px-2 py-2 rounded-full bg-primary text-white">
              <Home size={22} className="transition-all duration-300 " />
            </Link>
          )}

          <Link
            href={`/user/${userAuth.creds?.userId}`}
            className="mx-2 px-2 py-2 rounded-full bg-primary text-white"
          >
            <Settings size={22} className="transition-all duration-300 " />
          </Link>

          <button className="mx-2 px-2 py-2 rounded-full bg-primary text-white" onClick={logout}>
            <LogOut size={22} className="transition-all duration-300" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
