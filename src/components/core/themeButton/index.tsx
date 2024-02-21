"use client";
import { Sun, Moon } from "react-feather";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Loader from "@/app/loading";

export default function ThemeButton({ iconSize }: { iconSize: number }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Required this effect for state mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // return <small className="text-sm">Loading...</small>;
    return <Loader />;
  }

  return (
    <>
      {theme === "dark" ? (
        <button
          className="fixed my-[-82px] mx-[-89px] sm:my-0 sm:mx-[-600px]  px-2 py-2  rounded-full   sm:bg-green-600 hover:bg-primary-light hover:scale-105 text-white"
          onClick={() => setTheme("light")}
        >
          <Sun size={iconSize} cursor="pointer" className="transition-all duration-300" />
          <span className="sr-only">theme button</span>
        </button>
      ) : (
        <button
          className="fixed my-[-82px] mx-[-89px] sm:my-0 sm:mx-[-60px] px-2 py-2 rounded-full hover:bg-primary-light hover:scale-105 bg-primary text-white"
          onClick={() => setTheme("dark")}
        >
          <Moon size={iconSize} cursor="pointer" className="transition-all duration-300" />
          <span className="sr-only">theme button</span>
        </button>
      )}
    </>
  );
}
