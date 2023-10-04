"use client";
import { Sun, Moon } from "react-feather";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeButton({ iconSize }: { iconSize: number }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Required this effect for state mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <small className="text-sm">Loading...</small>;
  }

  return (
    <>
      {theme === "dark" ? (
        <button
          className="mx-2 px-2 py-2 rounded-full bg-primary text-white"
          onClick={() => setTheme("light")}
        >
          <Sun size={iconSize} cursor="pointer" className="transition-all duration-300" />
        </button>
      ) : (
        <button
          className="mx-2 px-2 py-2 rounded-full bg-primary text-white"
          onClick={() => setTheme("dark")}
        >
          <Moon size={iconSize} cursor="pointer" className="transition-all duration-300" />
        </button>
      )}
    </>
  );
}
