import { ReactNode } from "react";
import Link from "next/link";

interface Button {
  href?: string; // ? means optional
  newTab?: boolean;
  children: ReactNode;
  size: "small" | "normal" | "big";
  type?: "button" | "submit" | "reset";
}

function ButtonLong({ href = "#", newTab = false, children, size ,type }: Button) {
  const buttonSizes = {
    small: "px-6 py-2 text-sm",
    normal: "px-10 py-2 text-base",
    big: "px-14 py-3 text-md",    
  };

  if (type) {
    // If a type prop is provided, render a button element
    return (
      <button type={type} className={`${buttonSizes[size]} rounded-full text-white bg-primary  transition hover:bg-primary-light hover:scale-105`}>
        {children}
      </button>
    );
  }

  // else render a link element
  return (
    <>
      <Link
        href={href}
        target={newTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`${buttonSizes[size]} rounded-full text-white bg-primary  transition hover:bg-primary-light hover:scale-105`}
      >
        {children}
      </Link>
    </>
  );
}

function ButtonCircle() {
  return <></>;
}

export { ButtonLong, ButtonCircle };
