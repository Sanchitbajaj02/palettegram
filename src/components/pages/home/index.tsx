// import HeaderImage from "@/public/assets/header.png";
// import PalettegramFor from "@/public/assets/palettegram_for.png";
// import Logo from "@/public/assets/logo.png";
"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function HomePage() {
  const router = useRouter();

  const state = useSelector((state: any) => state.authenticator);

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
          <div>
            <button
              className="mx-4 px-16 py-2 text-lg rounded-full text-white bg-primary"
              onClick={() => router.push("/register")}
            >
              Register
            </button>

            <button
              className="px-16 py-2 text-lg rounded-full text-white bg-primary"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-xl mx-auto px-2">
        <section className="flex items-center flex-col md:flex-row gap-4 mt-20 mb-24">
          <article>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide text-black">
              Present Palettes Around the World
            </h1>
            <p className="text-xl md:text-2xl my-8 text-black">
              Transform ideas into Beautiful Palettes, Inspire Fellow Designers.
            </p>
            {state?.userId ? (
              <button
                className="px-16 py-4 text-xl rounded-full text-white bg-primary"
                onClick={() => router.push("/feed")}
              >
                Checkout your feed
              </button>
            ) : (
              <button
                className="px-16 py-4 text-xl rounded-full text-white bg-primary"
                onClick={() => router.push("/register")}
              >
                Start your journey
              </button>
            )}
          </article>
          <figure className="w-[80%] my-4">
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
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide text-black">Who is Palettegram for?</h1>
            <p className="text-xl md:text-2xl my-8 text-black">
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
