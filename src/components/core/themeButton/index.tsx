"use client";
import { Sun, Moon, Loader2 } from "lucide-react";
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
    return (
      <>
        <button className="px-2 py-2 md:flex fixed md:static block md:top-0 md:m-0 top-1 m-2 rounded-full hover:bg-primary-light hover:scale-105 bg-primary text-white">
          <Loader2 className="transition-all duration-300 animate-spin" />
        </button>
      </>
    );
  }

  return (
    <>
      {theme === "dark" ? (
        <button
          className="px-2 py-2 md:flex fixed md:static block md:top-0 md:m-0 top-1 m-2 rounded-full hover:bg-primary-light hover:scale-105 bg-primary text-white"
          onClick={() => setTheme("light")}
        >
          <Sun size={iconSize} cursor="pointer" className="transition-all duration-300" />
          <span className="sr-only">theme button</span>
        </button>
      ) : (
        <button
          className="px-2 py-2 md:flex fixed md:static block md:top-0 md:m-0 top-1 m-2 rounded-full hover:bg-primary-light hover:scale-105 bg-primary text-white"
          onClick={() => setTheme("dark")}
        >
          <Moon size={iconSize} cursor="pointer" className="transition-all duration-300" />
          <span className="sr-only">theme button</span>
        </button>
      )}
    </>
  );
}