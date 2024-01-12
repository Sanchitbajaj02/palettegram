"use client";
import { Suspense } from "react";
import Link from "next/link";
import { User, Bookmark } from "react-feather";
import { parseCookies } from "nookies";

import Loader from "@/app/loading";
import CreatePost from "@/components/core/createPost";
import Posts from "@/components/core/posts";
import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";

const Feed = () => {
  const cookies = parseCookies();
  const userIdFromCookies: string = cookies["userId"];

  return (
    <>
      <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-8 content-center px-4  ">
        <div className=" flex-1 sticky flex sm:flex-col items-center gap-8 sm:space-y-20 ">
          <Link
            href={`/user/${userIdFromCookies}`}
            className="w-12 h-12 sm:fixed rounded-full flex items-center justify-center shadow-md dark:shadow-gray-600 transition-all duration-300 text-black dark:text-white hover:text-primary-light border hover:border-primary-light"
          >
            <User size={20} />
          </Link>
          <Link
            href="/user/bookmarks"
            className="w-12 h-12 sm:fixed rounded-full flex items-center justify-center shadow-md dark:shadow-gray-600 transition-all duration-300 text-black dark:text-white hover:text-primary-light border hover:border-primary-light"
          >
            <Bookmark size={20} />
          </Link>
        </div>
        <div className="flex-[5] mt-4 sm:mt-0">
          <CreatePost />
          <Suspense fallback={<Loader />}>
            <Posts />
          </Suspense>
        </div>
        <div className="flex-[2] hidden md:block">
          <TrendingFeed />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Feed;
