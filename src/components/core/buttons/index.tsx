import { ReactNode } from "react";
import Link from "next/link";

interface Button {
  href: string;
  newTab?: boolean;
  children: ReactNode;
  size: "small" | "normal" | "big";
}

function ButtonLong({ href, newTab = false, children, size }: Button) {
  const buttonSizes = {
    small: "px-6 py-2 text-sm",
    normal: "px-10 py-2 text-base",
    big: "px-14 py-3 text-md",
  };

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
