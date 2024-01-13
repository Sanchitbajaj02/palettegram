import "@/styles/globals.css";
import { Suspense } from "react";

import Loader from "@/app/loading";
import Navbar from "@/components/core/navbar";

export default async function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
}
