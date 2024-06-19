"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { User, LogOut, Home, Github, X, Menu, Bookmark } from "lucide-react";
import ThemeButton from "@/components/core/themeButton";
import { ButtonLong } from "../buttons";

import { logoutUser, getUserByUserId } from "@/backend/auth.api";
import { getAllPosts } from "@/backend/posts.api";
import { getBookmarks } from "@/backend/bookmarks.api";

import { logUserOut, saveUserToStore } from "@/redux/reducers/authReducer";
import { getPosts } from "@/redux/reducers/postsReducer";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";
import { parseCookies } from "nookies";

import { startTour } from "@/helper/startTour";

const Navbar = ({ starCount }: { starCount?: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const userAuth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const cookies = parseCookies();

  const userIdFromCookies: string = cookies["userId"];

  const logout = async () => {
    await logoutUser();

    dispatch(logUserOut());

    router.push("/");
  };

  const currentUser = useCallback(
    (userIdFromCookies: string) => {
      if (userIdFromCookies) {
        getUserByUserId(userIdFromCookies)
          .then((currUser: any) => {
            dispatch(saveUserToStore(currUser));
          })
          .catch((err) => console.log(err));
      }
    },
    [dispatch],
  );

  const getPostsFromDatabase = useCallback(() => {
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
  }, [dispatch, userIdFromCookies]);

  const getBookmarksFromDatabase = useCallback(
    (userIdFromCookies: string) => {
      if (userIdFromCookies) {
        getBookmarks(userIdFromCookies)
          .then((bookmarks) => {
            if (bookmarks) {
              dispatch(
                saveBookmarkToStore({
                  userId: bookmarks?.documents[0]?.userId?.$id,
                  postId: bookmarks?.documents[0]?.postId,
                }),
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (userIdFromCookies) {
      currentUser(userIdFromCookies);
      getPostsFromDatabase();
      getBookmarksFromDatabase(userIdFromCookies);
    }

    return () => {
      console.log("cleanup");
    };
  }, [currentUser, getBookmarksFromDatabase, getPostsFromDatabase, userIdFromCookies]);

  if (userAuth.error) {
    return <h1>Error</h1>;
  }

  if (userAuth.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <nav className="w-full sticky top-0 shadow-md py-2 px-4 md:px-10 backdrop-blur-sm dark:shadow-gray-600 z-50">
        {/* Desktop menu items */}
        <div className="max-w-screen-lg mx-auto flex items-center content-center justify-between backdrop-blur-sm bg-grey-100 bg-opacity-20 h-16 my-2">
          <Link href={userAuth.creds?.userId ? "/feed" : "/"}>
            <Image
              className="navbar-brand fw-bold w-10 h-10 cursor-pointer dark:shadow-md dark:shadow-gray-500 rounded-full ml-2 md:ml-0 hero"
              src={"/assets/logo.png"}
              alt="settings"
              width={100}
              height={100}
            />
          </Link>

          {/* Hamburger menu button for small screens */}
          <div className="md:hidden flex justify-end items-center">
            <div className="mr-2" id="nav-theme">
              <ThemeButton iconSize={18} />
            </div>
            <div className="flex">
              <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className={`px-2 lg:hidden dark:text-white dark:hover:text-primary text-secondary hover:text-primary transition-all duration-300 focus:outline-none ${
                  isMenuOpen ? "hidden" : "closed"
                }`}
              >
                <Menu size={32} />
              </button>
            </div>
          </div>

          <div className="hidden md:flex gap-2 flex-row items-center">
            <div id="theme">
              <ThemeButton iconSize={22} />
            </div>
            <button
              type="button"
              className="px-10 py-2 text-base rounded-full bg-primary text-white hover:bg-primary-light hover:scale-105"
              onClick={() => startTour().start()}
            >
              Start Tour
            </button>
            {userIdFromCookies ? (
              <>
                {pathname !== "/feed" && (
                  <Link
                    href="/feed"
                    className="mx-2 px-2 py-2 rounded-full bg-primary text-white hover:bg-primary-light hover:scale-105"
                  >
                    <Home size={22} className="transition-all duration-300" />
                  </Link>
                )}
                <Link
                  href={`/user/${userAuth.data?.$id}`}
                  className="mx-2 px-2 py-2 rounded-full bg-primary text-white hover:bg-primary-light hover:scale-105"
                >
                  <User size={22} className="transition-all duration-300" />
                </Link>

                <Link
                  href={`/user/bookmarks`}
                  className="mx-2 px-2 py-2 rounded-full bg-primary text-white hover:bg-primary-light hover:scale-105"
                >
                  <Bookmark size={22} className="transition-all duration-300" />
                </Link>

                <button
                  type="button"
                  className="mx-2 px-2 py-2 rounded-full bg-primary transition hover:bg-primary-light hover:scale-105 text-white"
                  onClick={logout}
                >
                  <LogOut size={22} className="transition-all duration-300" />
                </button>
              </>
            ) : (
              <div className="hidden md:flex gap-2">
                <span className="flex items-center git">
                  <ButtonLong
                    href="https://github.com/Sanchitbajaj02/palettegram"
                    newTab
                    size="normal"
                  >
                    <span className="flex items-center">
                      <Github size={20} className="mr-2" /> {starCount} Stars
                    </span>
                  </ButtonLong>
                </span>
                <span className="flex items-center register">
                  <ButtonLong href="/register" size="normal">
                    Register
                  </ButtonLong>
                </span>
                <span className="flex items-center loginin">
                  <ButtonLong href="/login" size="normal">
                    Login
                  </ButtonLong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="bg-secondary-light backdrop-blur-sm bg-opacity-60 dark:bg-primary-light dark:bg-opacity-60 h-[100vh] z-50 w-1/2 fixed inset-y-0 right-0 md:hidden transition-transform duration-300">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className={`absolute right-2 top-6 text-white dark:hover:text-primary focus:outline-none ${
                isMenuOpen ? "open" : "closed"
              } hover:text-primary lg:hidden`}
            >
              <X size={32} />
            </button>

            <div className="grid grid-cols-1 gap-4 mt-24 backdrop-blur-sm">
              <button
                type="button"
                className="mx-2 px-6 py-2 text-sm rounded-full bg-primary text-white hover:border-2 hover:bg-transparent"
                onClick={() => startTour().start()}
              >
                Start Tour
              </button>

              <Link
                href="https://github.com/Sanchitbajaj02/palettegram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm mx-2 px-10 py-2 rounded-full bg-primary text-white hover:border-2 hover:bg-transparent"
              >
                <Github size={20} className="mr-4" /> {starCount} Stars
              </Link>

              <Link
                href="/register"
                className="inline-block mx-2 px-6 py-2 text-sm rounded-full text-white bg-primary text-center hover:border-2 hover:bg-transparent"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="inline-block mx-2 px-6 py-2 text-sm rounded-full text-white bg-primary text-center hover:border-2 hover:bg-transparent"
              >
                Login
              </Link>

              {userAuth?.data?.$id && (
                <>
                  <Link
                    href={`/user/${userAuth.data?.$id}`}
                    className="mx-2 px-2 py-2 rounded-full bg-primary text-white"
                  >
                    <User size={22} className="transition-all duration-300" />
                  </Link>
                  <Link
                    href={`/user/bookmarks`}
                    className="mx-2 px-2 py-2 rounded-full bg-primary text-white"
                  >
                    <Bookmark size={22} className="transition-all duration-300" />
                  </Link>
                  <button
                    type="button"
                    className="mx-2 px-2 py-2 rounded-full bg-primary transition text-white"
                    onClick={logout}
                  >
                    <LogOut size={22} className="transition-all duration-300" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
