import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ isFixed }: { isFixed?: boolean }) {
  const generalList = [
    {
      id: 1,
      title: "Register",
      slug: "/register",
    },
    {
      id: 2,
      title: "Login",
      slug: "/login",
    },
    {
      id: 3,
      title: "Privacy Policy",
      slug: "/privacy",
    },
    {
      id: 4,
      title: "Terms & Conditions",
      slug: "/terms",
    },
  ];

  const helpSupport = [
    {
      id: 1,
      title: "Help Center",
      slug: "/contact",
    },
    {
      id: 2,
      title: "Contribution Guidelines",
      slug: "/contribute",
    },
  ];

  return (
    <section
      className={`mt-12 text-center text-secondary-light dark:text-primary-light ${
        !!isFixed ? "bottom-0 fixed w-full" : ""
      } `}
    >
      <div className="flex flex-col items-center md:flex-row border-t border-slate-500 w-11/12 min-w-75 m-auto py-10 ">
        <div className="flex items-center flex-1 pt-2 pb-9">
          <Link href="/">
            <Image
              className="rounded-full mr-4"
              src={"/assets/logo.png"}
              alt="settings"
              width={70}
              height={70}
            />
          </Link>
          <div className="text-left">
            <h2 className="text-secondary dark:text-white text-xl">Palettegram</h2>
            <p className="text-slate-500 text-sm pt-2">Social Media for Professionals</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto justify-between">
          <div className="flex flex-wrap flex-col gap-2 text-left px-5 py-2 lg:w-60">
            <h3 className="text-secondary dark:text-white text-xl mb-2">General</h3>

            {generalList &&
              generalList.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={item.slug}
                    className="transition-all duration-300 text-sm text-slate-400 hover:text-primary-light"
                  >
                    {item.title}
                  </Link>
                );
              })}
          </div>
          <div className="flex flex-wrap flex-col gap-2 text-left px-5 py-2 lg:w-60">
            <h3 className="text-secondary dark:text-white text-lg">Help & Support</h3>
            {helpSupport &&
              helpSupport.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={item.slug}
                    className="transition-all duration-300 text-sm text-slate-400 hover:text-primary-light"
                  >
                    {item.title}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <div className="py-4 space-y-2">
        <p className="text-xs">
          Copyright &copy; {new Date().getFullYear()} Palettegram | MIT License <br />
        </p>
        <p className="text-xs">Developed by Sanchit Bajaj and The Open Source Community</p>
      </div>
    </section>
  );
}
