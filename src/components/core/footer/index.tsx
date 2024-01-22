import React from "react";

export default function Footer({ isFixed }: { isFixed?: boolean }) {
  return (
    <section className={`mt-12 text-center ${!!isFixed ? "bottom-0 fixed w-full" : ""} `}>
      <p className="py-2 text-sm text-secondary-light dark:text-primary-light">
        Copyright &copy; {new Date().getFullYear()} Palettegram | All Rights Reserved.
      </p>
    </section>
  );
}
