import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Palettegram",
  description:
    "Palletegrm is a social media application dedicated to professionals like graphic designers, UI designers, UX designers, Developers, etc. to post and their color palletes as well as use other's color palletes.",

  keywords:
    "Palettegram, Appwrite, Color Designer, Palettegram social media, behance, dribbble, made for designers",

  alternates: {
    canonical: "https://palettegram.vercel.app/terms",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
