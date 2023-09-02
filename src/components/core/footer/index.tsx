import React from "react";

export default function Footer() {
  return (
    <section className="mt-12 text-center">
      <p className="py-4 text-secondary-text dark:text-primary-light">
        Copyright &copy; {new Date().getFullYear()} | All Rights Reserved.
      </p>
    </section>
  );
}
