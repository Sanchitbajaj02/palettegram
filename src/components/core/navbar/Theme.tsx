import { Sun, Moon } from "react-feather";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      {theme === "dark" ? (
        <Sun size={25} cursor="pointer" onClick={() => setTheme("light")} />
      ) : (
        <Moon size={25} cursor="pointer" onClick={() => setTheme("dark")} />
      )}
    </>
  );
};

export default Theme;
