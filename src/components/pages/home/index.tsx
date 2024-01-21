"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { GitHub, User } from "react-feather";
import { getCurrentUser } from "@/backend/auth.api";
import { saveUser } from "@/redux/reducers/authReducer";
import { Menu, X } from "react-feather";
import ThemeButton from "@/components/core/themeButton";
import { ButtonLong } from "@/components/core/buttons";
import { parseCookies } from "nookies";
import { toastify } from "@/helper/toastify";
import { motion } from "framer-motion";

function HomePage({ starCount }: { starCount: number }) {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const accountIdFromCookies: string = cookies["accountId"];

  const state = useSelector((state: any) => state.auth);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (accountIdFromCookies) {
      getCurrentUser()
        .then((resp) => {
          if (resp) {
            const payload = {
              userId: resp["$id"],
              email: resp["email"],
              isVerified: resp["emailVerification"],
              createdAt: resp["$createdAt"],
            };

            dispatch(saveUser(payload));
          }
        })
        .catch((err) => {
          console.log(err);

          toastify(err.message, "error");
        });
    }
  }, [dispatch, accountIdFromCookies]);

  return (
    <>
      <nav className="py-4 shadow-md dark:shadow-gray-600">
        <div className="max-w-screen-lg mx-auto flex flex-row justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="profile logo"
              width={50}
              height={50}
              className="dark:shadow-md dark:shadow-gray-500 rounded-full ml-2 md:ml-0"
            />
          </Link>

          {/* Hamburger menu button for small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMenuClick}
              className={`px-2 lg:hidden dark:text-white dark:hover:text-primary text-secondary hover:text-primary transition-all duration-300 focus:outline-none ${
                isMenuOpen ? "hidden" : "closed"
              }`}
            >
              <Menu size={32} />
            </button>
          </div>

          {/* Desktop menu items */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 80,
            }}
            className="hidden md:flex items-center justify-center space-x-4"
          >
            <ThemeButton iconSize={24} />

            <ButtonLong href="https://github.com/Sanchitbajaj02/palettegram" newTab size="normal">
              <span className="flex items-center">
                <GitHub size={20} className="mr-2" /> {starCount} Stars
              </span>
            </ButtonLong>

            {!state?.creds.userId && !state?.creds.isVerified && (
              <>
                <ButtonLong href="/register" size="normal">
                  Register
                </ButtonLong>

                <ButtonLong href="/login" size="normal">
                  Login
                </ButtonLong>
              </>
            )}
          </motion.div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="bg-secondary-light bg-opacity-25 dark:bg-primary-light dark:bg-opacity-25 h-full z-10 w-1/2 fixed inset-y-0 right-0 md:hidden transition-transform duration-300">
              <button
                onClick={handleMenuClick}
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
                  className="flex items-center text-sm text-center mx-2 px-6 py-2 rounded-full bg-primary text-white"
                >
                  <GitHub size={20} className="mr-4" /> {starCount} Stars
                </Link>

                {!state?.creds.userId && !state?.creds.isVerified && (
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
                {state?.creds.userId && state?.creds.isVerified && (
                  <Link
                    href={`/user/${accountIdFromCookies}`}
                    className="mx-2 px-2 py-2 rounded-full bg-primary text-white"
                  >
                    <User size={22} className="transition-all duration-300 " />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-screen-lg mx-auto px-2">
        <section className="flex flex-col items-center mt-32 mb-32 gap-4 md:flex-row md:justify-between">
          <article>
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 110,
                delay: 0,
              }}
              className="text-3xl font-bold text-center tracking-wide text-secondary dark:text-white md:text-6xl md:text-left"
            >
              Present Palettes Around the World
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 110,
                delay: 0.1,
              }}
              className="text-xl my-6 font-medium text-center text-secondary dark:text-white md:text-2xl md:text-left"
            >
              Transform ideas into Beautiful Palettes, Inspire Fellow Designers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 110,
                delay: 0.2,
              }}
              className="flex justify-center md:justify-start"
            >
              {state?.creds.userId && state?.creds.userId !== "" ? (
                <ButtonLong href="/feed" size="big">
                  Checkout your feed
                </ButtonLong>
              ) : (
                <ButtonLong href="/register" size="big">
                  Start your journey
                </ButtonLong>
              )}
            </motion.div>
          </article>

          <figure className="w-[70%] my-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -640 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 80,
              }}
            >
              <Image
                src="/assets/header.png"
                alt="Header section"
                loading="lazy"
                width={400}
                height={400}
                className="custom-shadow floating-image"
              />
            </motion.div>
          </figure>
        </section>

        <section className="flex items-center flex-col-reverse md:flex-row gap-4 mt-32 mb-32">
          <figure className="w-[70%]">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 80,
                delay: 0.2,
              }}
            >
              <Image
                src="/assets/palettegram-for.png"
                alt="Who is palettegram for section"
                loading="lazy"
                width={600}
                height={500}
                className="mx-auto rounded"
              />
            </motion.div>
          </figure>
          <article>
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 80,
                delay: 0,
              }}
              className="text-3xl md:text-6xl text-center font-extrabold tracking-wide text-black dark:text-white md:text-right"
            >
              Who is <br /> Palettegram for?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 80,
                delay: 0.1,
              }}
              className="text-xl md:text-2xl text-center my-8 text-black dark:text-white md:text-right"
            >
              Anyone who wants to share their designs and color palettes to get the review among the
              professionals.
            </motion.p>
          </article>
        </section>
      </main>
    </>
  );
}
export default HomePage;
