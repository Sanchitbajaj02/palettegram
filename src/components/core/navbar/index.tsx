"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { User, LogOut, Home } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import ThemeButton from "@/components/core/themeButton";

import { parseCookies } from "nookies";

import { logoutUser, getUserByUserId } from "@/backend/auth.api";
import { getAllPosts } from "@/backend/posts.api";
import { getBookmarks } from "@/backend/bookmarks.api";

import { logUserOut, saveUser } from "@/redux/reducers/authReducer";
import { getPosts } from "@/redux/reducers/postsReducer";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const userAuth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const cookies = parseCookies();

  const userIdFromCookies: string = cookies["accountId"];
  const userId: string = cookies["userId"];

  const logout = async () => {
    await logoutUser();

    dispatch(logUserOut());

    router.push("/");
  };

  useEffect(() => {
    getUserByUserId(userId)
      .then((currUser: any) => {
        const payload = {
          $id: currUser?.documents[0]?.$id,
          accountId: currUser?.documents[0]?.accountId,
          email: currUser?.documents[0]?.email,
          isVerified: currUser?.documents[0]?.isVerified,
          $createdAt: currUser?.documents[0]?.$createdAt,
        };

        dispatch(saveUser(payload));
      })
      .catch((err) => console.log(err));

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

      getBookmarks(userId)
        .then((bookm) => {
          dispatch(
            saveBookmarkToStore({
              userId: bookm?.documents[0]?.userId?.$id,
              postId: bookm?.documents[0]?.postId,
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
  }, [userId, dispatch, userIdFromCookies]);

  if (userAuth.error) {
    return <h1>Error</h1>;
  }

  if (userAuth.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <nav className="w-full sticky top-0 backdrop-blur-sm bg-grey-100 bg-opacity-20 z-50 shadow-md py-2 px-4 dark:shadow-gray-600">
      <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between  h-12">
        <Link href={userAuth.data?.$id ? "/feed" : "/"}>
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
          {userAuth.data?.$id && (
            <>
              <Link
                href={`/user/${userAuth.data?.$id}`}
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
