"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GitHub } from "react-feather";
import { isLoggedIn } from "@/backend/auth.api";
import { saveUser } from "@/redux/reducers/authReducer";
import { Menu, X } from "react-feather";
import ThemeButton from "@/components/core/themeButton";

function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state.auth);

  const [stars, setStars] = useState(0);
 
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const handleMenuClick = () => {
      setMenuOpen(!isMenuOpen);
    };

  

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
      <div className="max-w-screen-lg mx-auto flex flex-row justify-between items-center">
        <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="profile logo"
              width={50}
              height={50}
              className="dark:shadow-md dark:shadow-gray-500 rounded-full"
            />
        </Link>

        <div className="md:hidden">
        <Theme />
        </div>
        

        {/* Hamburger menu button for small screens */}
        <div className="md:hidden flex items-center">
          <button
          onClick={handleMenuClick}
          className={`px-2 lg:hidden dark:text-white dark:hover:text-primary focus:outline-none ${isMenuOpen ? 'hidden' : 'closed'} text-gray-600 hover:text-primary`}
          >
              <Menu size={32}/>
         
          </button>
        </div>

        {/* Desktop menu items */}
        <div className="hidden md:flex items-center justify-center space-x-4">
          <Theme />
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
        
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-primary bg-opacity-50 h-full z-10 w-1/2 fixed inset-y-0 right-0 md:hidden">
          <button
          onClick={handleMenuClick}
          className={`absolute right-2 top-6 dark:text-white dark:hover:text-primary focus:outline-none ${isMenuOpen ? 'open' : 'closed'} text-gray-600 hover:text-primary lg:hidden`}
          >
              <X size={32}/>
          </button>

          <div className="grid grid-cols-1 gap-10 mt-24"> 

            <Link
              href="https://github.com/Sanchitbajaj02/palettegram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm mx-2 px-6 py-2 rounded-full bg-primary text-white"
            >
              <GitHub size={20} className="mr-4" /> {stars} Stars
            </Link>

            {!state?.creds.userId && !state?.creds.isVerified && (
              <>
                <Link
                  href="/register"
                  className="inline-block mx-2 px-6 py-2 text-sm rounded-full text-white bg-primary"
                >
                  Register
                </Link>

                <Link
                  href="/login"
                  className="inline-block mx-2 px-6 py-2 text-sm rounded-full text-white bg-primary"
                >
                  Login
                </Link>
                
              </>
            )}
          </div>

        </div>
        )}
      </div>
    </nav>

      <main className="max-w-screen-lg mx-auto px-2">
        <section className="flex flex-col items-center mt-20 mb-24 gap-4 md:flex-row md:justify-between">
          <article>
            <h1 className="text-4xl md:text-6xl text-center font-extrabold tracking-wide text-black dark:text-white md:text-left">
              Present Palettes Around the World
            </h1>
            <p className="text-2xl md:text-3xl my-8 text-black text-center dark:text-white md:text-left">
              Transform ideas into Beautiful Palettes, Inspire Fellow Designers.
            </p>

            <div className="flex justify-center md:justify-start">
            {state?.creds.userId && state?.creds.isVerified ? (
              <Link href="/feed" className="px-10 py-3 text-sm rounded-full text-white bg-primary md:px-16 md:py-4 md:text-lg">
                Checkout your feed
              </Link>
            ) : (
              <Link
                href="register"
                className="px-10 py-2 text-md rounded-full text-white bg-primary md:px-16 md:py-4 md:text-lg"
              >
                Start your journey
              </Link>
            )}
            </div>
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

        <section className="flex items-center flex-col-reverse md:flex-row gap-4 mt-30 mb-20">
          <figure className="w-[50%]">
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
            <h1 className="text-3xl md:text-6xl text-center font-extrabold tracking-wide text-black dark:text-white md:text-right">
              Who is Palettegram for?
            </h1>
            <p className="text-xl text-center md:text-2xl my-8 text-black dark:text-white md:text-right">
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
