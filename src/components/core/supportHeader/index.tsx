import React from "react";

interface SupportHeaderType {
  title: string;
  updatedDate: string;
  effectiveDate: string;
}

export default function SupportHeader({ title, updatedDate, effectiveDate }: SupportHeaderType) {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return (
    <section className="text-center my-20">
      <p className="inline-block border-b-2 border-slate-500 uppercase text-lg font-semibold tracking-wider text-slate-500">
        Palettegram
      </p>
      <h1 className="my-12 py-4 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-primary to-primary-light capitalize">
        {title}
      </h1>
      <div className="flex justify-center space-x-1 text-base text-slate-500">
        <p>Updated on {new Date(updatedDate).toLocaleDateString("en-US", options)}</p>
        <p>·</p>
        <p>Effective from {new Date(effectiveDate).toLocaleDateString("en-US", options)}</p>
      </div>
    </section>
  );
}
