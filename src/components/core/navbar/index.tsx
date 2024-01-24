"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { User, LogOut, Home } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import ThemeButton from "@/components/core/themeButton";

import { parseCookies } from "nookies";

import { logoutUser } from "@/backend/auth.api";
import { getAllPosts } from "@/backend/posts.api";
import { getBookmarks } from "@/backend/bookmarks.api";

import { logUserOut } from "@/redux/reducers/authReducer";
import { getPosts } from "@/redux/reducers/postsReducer";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const userAuth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const cookies = parseCookies();

  const userIdFromCookies: string = cookies["accountId"];

  const logout = async () => {
    await logoutUser();

    dispatch(logUserOut());

    router.push("/");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllPosts()
        .then((posts) => {
          if (posts && posts?.documents.length > 0) {
            dispatch(getPosts(posts.documents));
          }
        })
        .catch((error) => {
          console.log(error);
        });

      getBookmarks(userIdFromCookies)
        .then((bookm) => {
          dispatch(
            saveBookmarkToStore({
              accountId: userIdFromCookies,
              bookmark: bookm?.documents[0]?.bookmark,
            }),
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      console.log("clear");
    };
  }, [userIdFromCookies, dispatch]);

  if (userAuth.error) {
    return <h1>Error</h1>;
  }

  if (userAuth.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <nav className="w-full sticky top-0 backdrop-blur-sm bg-grey-100 bg-opacity-20 z-50 shadow-md py-2 px-4 dark:shadow-gray-600">
      <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between  h-12">
        <Link href={userAuth.creds?.userId ? "/feed" : "/"}>
          <Image
            className="navbar-brand fw-bold w-10 h-10 cursor pointer  "
            src={"/assets/logo.png"}
            alt="settings"
            width={100}
            height={100}
          />
        </Link>

        <div className="flex gap-2 flex-row items-center">
          <ThemeButton iconSize={22} />
          {pathname !== "/feed" && (
            <Link
              href="/feed"
              className="mx-2 px-2 py-2 rounded-full bg-primary text-white hover:bg-primary-light hover:scale-105"
            >
              <Home size={22} className="transition-all duration-300   " />
            </Link>
          )}

          {userAuth.creds?.userId && (
            <>
              <Link
                href={`/user/${userIdFromCookies}`}
                className="mx-2 px-2 py-2 rounded-full  bg-primary text-white  hover:bg-primary-light hover:scale-105"
              >
                <User size={22} className="transition-all duration-300 " />
              </Link>

              <button
                className="mx-2 px-2 py-2 rounded-full bg-primary transition hover:bg-primary-light hover:scale-105 text-white"
                onClick={logout}
              >
                <LogOut size={22} className="transition-all duration-300" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
