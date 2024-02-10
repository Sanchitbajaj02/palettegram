import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ isFixed }: { isFixed?: boolean }) {
  return (
    <section className={`mt-12 text-center text-secondary-light dark:text-primary-light ${!!isFixed ? "bottom-0 fixed w-full" : ""} `}>
      <div className="flex flex-col items-center md:flex-row border-t border-white w-11/12 min-w-75 m-auto py-10 ">
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
            <h3 className="text-secondary dark:text-white text-lg">General</h3>
            <Link href="/register" className="text-sm text-slate-400 hover:text-primary-light">
              Register
            </Link>
            <Link href="/login" className="text-sm text-slate-400 hover:text-primary-light">
              Login
            </Link>
            <Link href="/contact" className="text-sm text-slate-400 hover:text-primary-light">
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm text-slate-400 hover:text-primary-light">
              Terms & Conditions
            </Link>
          </div>
          <div className="flex flex-wrap flex-col gap-2 text-left px-5 py-2 lg:w-60">
            <h3 className="text-secondary dark:text-white text-lg">Help & Support</h3>
            <Link href="/" className="text-sm text-slate-400 hover:text-primary-light">
              Help center
            </Link>
            <Link href="/" className="text-sm text-slate-400 hover:text-primary-light">
              Contributors guidelines
            </Link>
          </div>
        </div>
      </div>  
      <p className="py-2 text-[13px]">
        Copyright &copy; {new Date().getFullYear()} Palettegram | All Rights Reserved.
      </p>
    </section>
  );
}
