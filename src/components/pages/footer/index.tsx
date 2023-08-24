import React from "react";

export default function Footer() {
  return (
    <section className="mt-12 text-center">
      <p className="py-4 text-[#424551]">
        Copyright &copy; {new Date().getFullYear()} | All Rights Reserved.
      </p>
    </section>
  );
}
