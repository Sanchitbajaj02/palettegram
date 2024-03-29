"use client";
import { Suspense } from "react";
import Link from "next/link";
import { User, Bookmark } from "lucide-react";
import { parseCookies } from "nookies";
import CreatePost from "@/components/core/createPost";
import Posts from "@/components/core/posts";
import TrendingFeed from "@/components/core/trendingFeed";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";

const Feed = () => {
  const router = useRouter();

  const cookies = parseCookies();
  const userId: string = cookies["userId"];
  const isVerified: string = cookies["isVerified"];

  if (isVerified === "false") {
    router.push("/verify");
  }

  return (
    <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-8 content-center px-2">
      <section className="flex-[5] mt-4 md:pl-6 sm:mt-0">
        <CreatePost />
        <Suspense fallback={<Loader />}>
          <Posts />
        </Suspense>
      </section>
      <section className="flex-[2] hidden md:block">
        <TrendingFeed />
      </section>
    </main>
  );
};
export default Feed;
