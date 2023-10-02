"use client";
import { Sun, Moon } from "react-feather";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeButton = () => {
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
          className="flex items-center text-md mx-2 px-4 py-2 rounded-full bg-primary text-white"
          onClick={() => setTheme("light")}
        >
          <Sun size={24} cursor="pointer" />
        </button>
      ) : (
        <button
          className="flex items-center text-md mx-2 px-4 py-2 rounded-full bg-primary text-white"
          onClick={() => setTheme("dark")}
        >
          <Moon size={24} cursor="pointer" />
        </button>
      )}
    </>
  );
};

export default ThemeButton;
