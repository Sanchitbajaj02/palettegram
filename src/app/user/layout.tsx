import "@/styles/globals.css";
import { Suspense } from "react";

import { Metadata } from "next";
import Loader from "@/app/loading";
import Navbar from "@/components/core/navbar";

export const metadata: Metadata = {
  title: "User Dashboard | Palettegram - from professionals by professionals",
  description:
    "Palletegrm is a social media application dedicated to professionals like graphic designers, UI designers, UX designers, Developers, etc. to post and their color palletes as well as use other's color palletes.",

  alternates: {
    canonical: "https://palettegram.vercel.app",
  },
};

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
}
