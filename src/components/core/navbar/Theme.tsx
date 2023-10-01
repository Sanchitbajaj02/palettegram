import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
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
        <BsSun size={25} cursor="pointer" onClick={() => setTheme("light")} />
      ) : (
        <FiMoon size={25} cursor="pointer" onClick={() => setTheme("dark")} />
      )}
    </>
  );
};

export default Theme;
