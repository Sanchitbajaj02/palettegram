"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GitHub } from "react-feather";
import { isLoggedIn } from "@/backend/auth.api";
import { saveUser } from "@/redux/reducers/authReducer";
// import Theme from "@/components/core/navbar/Theme";
import ThemeButton from "@/components/core/themeButton";

function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state.auth);

  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/sanchitbajaj02/palettegram")
      .then((res) => res.json())
      .then((res) => {
        setStars(res.stargazers_count);
      });

    isLoggedIn()
      .then((resp) => {
        console.log(resp);

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
      .catch(console.log);
  }, [dispatch]);

  return (
    <>
      <nav className="py-4 shadow-md dark:shadow-gray-600">
        <div className=" max-w-screen-xl mx-auto flex flex-row justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="profile logo"
              width={50}
              height={50}
              className="dark:shadow-md dark:shadow-gray-500 rounded-full"
            />
          </Link>
          <div className="flex items-center justify-center">
            <ThemeButton iconSize={24} />
            <Link
              href="https://github.com/Sanchitbajaj02/palettegram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-md mx-2 px-8 py-2 rounded-full bg-primary text-white"
            >
              <GitHub size={20} className="mr-4" /> {stars} Stars
            </Link>

            {!state?.creds.userId && !state?.creds.isVerified && (
              <>
                <Link
                  href="/register"
                  className="inline-block mx-2 px-8 py-2 text-md rounded-full text-white bg-primary"
                >
                  Register
                </Link>

                <Link
                  href="/login"
                  className="inline-block mx-2 px-8 py-2 text-md rounded-full text-white bg-primary"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-screen-xl mx-auto px-2">
        <section className="flex items-center flex-col md:flex-row gap-4 mt-20 mb-24">
          <article>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide text-black dark:text-white">
              Present Palettes Around the World
            </h1>
            <p className="text-xl md:text-2xl my-8 text-black dark:text-white">
              Transform ideas into Beautiful Palettes, Inspire Fellow Designers.
            </p>
            {state?.creds.userId && state?.creds.isVerified ? (
              <Link href="/feed" className="px-16 py-4 text-lg rounded-full text-white bg-primary">
                Checkout your feed
              </Link>
            ) : (
              <Link
                href="register"
                className="px-16 py-4 text-lg rounded-full text-white bg-primary"
              >
                Start your journey
              </Link>
            )}
          </article>
          <figure className="w-[80%] my-4">
            <div className="shape1 -z-10" />
            <Image
              src="/assets/header.png"
              alt="Header section"
              loading="lazy"
              width={450}
              height={250}
              className="mx-auto"
            />
          </figure>
        </section>

        <section className="flex items-center flex-col-reverse md:flex-row gap-4 mt-24 mb-20">
          <figure className="w-full md:w-[50%]">
            <Image
              src="/assets/palettegram_for.png"
              alt="Who is palettegram for section"
              loading="lazy"
              width={400}
              height={200}
              className="mx-auto"
            />
          </figure>
          <article>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide text-black dark:text-white">
              Who is Palettegram for?
            </h1>
            <p className="text-xl md:text-2xl my-8 text-black dark:text-white">
              Anyone who wants to share their designs and color palettes to get the review among the
              professionals.
            </p>
          </article>
        </section>
      </main>
    </>
  );
}
export default HomePage;
