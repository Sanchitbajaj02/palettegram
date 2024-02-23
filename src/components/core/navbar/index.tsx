"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { User, LogOut, Home, GitHub, X, Menu } from "react-feather";
import ThemeButton from "@/components/core/themeButton";
import { ButtonLong } from "../buttons";
import { parseCookies } from "nookies";

import { logoutUser, getCurrentUser } from "@/backend/auth.api";
import { getAllPosts } from "@/backend/posts.api";
import { getBookmarks } from "@/backend/bookmarks.api";

import { logUserOut, saveUser } from "@/redux/reducers/authReducer";
import { getPosts } from "@/redux/reducers/postsReducer";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";

const Navbar = ({ starCount }: { starCount?: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const userAuth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const cookies = parseCookies();

  let userIdFromCookies: string | null = null;
  userIdFromCookies = cookies["accountId"];

  const logout = async () => {
    await logoutUser();

    dispatch(logUserOut());

    router.push("/");
  };

  const currentUser = useCallback(() => {
    console.log("inside currentUser");
    getCurrentUser()
      .then((currUser: any) => {
        console.log("currUser: ", currUser);

        const payload = {
          accountId: currUser.$id,
          email: currUser.email,
          isVerified: currUser.emailVerification,
          createdAt: currUser.$createdAt,
        };

        dispatch(saveUser(payload));
      })
      .catch((err) => console.log(err));
  }, []);

  const getPostsFromDatabase = useCallback(() => {
    console.log("inside getPostsFromDatabase");

    if (userIdFromCookies) {
      getAllPosts()
        .then((posts) => {
          if (posts && posts?.documents.length > 0) {
            dispatch(getPosts(posts.documents));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userIdFromCookies]);

  const getBookmarksFromDatabase = useCallback(
    (userIdFromCookies: string | null) => {
      console.log("inside getBookmarksFromDatabase");

      if (userIdFromCookies) {
        getBookmarks(userIdFromCookies)
          .then((bookmarks) => {
            if (bookmarks) {
              dispatch(
                saveBookmarkToStore({
                  accountId: userIdFromCookies,
                  bookmark: bookmarks?.documents[0]?.bookmark,
                }),
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [userIdFromCookies],
  );

  useEffect(() => {
    currentUser();
    getPostsFromDatabase();
    getBookmarksFromDatabase(userIdFromCookies);

    return () => {
      console.log("cleanup");
    };
  }, []);

  if (userAuth.error) {
    return <h1>Error</h1>;
  }

  if (userAuth.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <nav className="w-full sticky top-0 shadow-md py-2 dark:shadow-gray-600 z-50">
        {/* Desktop menu items */}

        <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between backdrop-blur-sm bg-grey-100 bg-opacity-20 h-12">
          <Link href={userAuth.creds?.userId ? "/feed" : "/"}>
            <Image
              className="navbar-brand fw-bold w-10 h-10 cursor pointer dark:shadow-md dark:shadow-gray-500 rounded-full ml-2 md:ml-0 "
              src={"/assets/logo.png"}
              alt="settings"
              width={100}
              height={100}
            />
          </Link>

          {/* Hamburger menu button for small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className={`px-2 lg:hidden dark:text-white dark:hover:text-primary text-secondary hover:text-primary transition-all duration-300 focus:outline-none ${
                isMenuOpen ? "hidden" : "closed"
              }`}
            >
              <Menu size={32} />
            </button>
          </div>

          <div className="hidden md:flex gap-2 flex-row items-center">
            <ThemeButton iconSize={22} />
            {userAuth.creds?.accountId && userAuth.creds?.isVerified ? (
              <>
                {pathname !== "/feed" && (
                  <Link
                    href="/feed"
                    className="mx-2 px-2 py-2 rounded-full bg-primary text-white hover:bg-primary-light hover:scale-105"
                  >
                    <Home size={22} className="transition-all duration-300   " />
                  </Link>
                )}
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
            ) : (
              <div className="hidden md:flex gap-2">
                <ButtonLong
                  href="https://github.com/Sanchitbajaj02/palettegram"
                  newTab
                  size="normal"
                >
                  <span className="flex items-center">
                    <GitHub size={20} className="mr-2" /> {starCount} Stars
                  </span>
                </ButtonLong>
                <ButtonLong href="/register" size="normal">
                  Register
                </ButtonLong>

                <ButtonLong href="/login" size="normal">
                  Login
                </ButtonLong>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="bg-secondary-light bg-opacity-25 dark:bg-primary-light dark:bg-opacity-25 h-full z-10 w-1/2 fixed inset-y-0 right-0 md:hidden transition-transform duration-300">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className={`absolute right-2 top-6 dark:text-white dark:hover:text-primary focus:outline-none ${
                isMenuOpen ? "open" : "closed"
              } text-gray-600 hover:text-primary lg:hidden`}
            >
              <X size={32} />
            </button>

            <div className="grid grid-cols-1 gap-10 mt-24">
              <div className="text-center">
                <ThemeButton iconSize={24} />
              </div>

              <Link
                href="https://github.com/Sanchitbajaj02/palettegram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm mx-2 px-10 py-2 rounded-full bg-primary text-white"
              >
                <GitHub size={20} className="mr-4" /> {starCount} Stars
              </Link>

              {!userAuth?.creds.userId && !userAuth?.creds.isVerified && (
                <>
                  <Link
                    href="/register"
                    className="inline-block mx-2 px-6 py-2 text-sm rounded-full text-white bg-primary text-center"
                  >
                    Register
                  </Link>

                  <Link
                    href="/login"
                    className="inline-block mx-2 px-6 py-2 text-sm rounded-full text-white bg-primary text-center"
                  >
                    Login
                  </Link>
                </>
              )}
              {userAuth?.creds.userId && userAuth?.creds.isVerified && (
                <Link
                  href={`/user/${userIdFromCookies}`}
                  className="mx-2 px-2 py-2 rounded-full bg-primary text-white"
                >
                  <User size={22} className="transition-all duration-300 " />
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;
