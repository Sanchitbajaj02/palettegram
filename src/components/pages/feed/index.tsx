"use client";
import CreatePost from "@/components/core/createPost";
import Posts from "@/components/core/posts";
import TrendingFeed from "@/components/core/trendingFeed";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { User, Bookmark } from "react-feather";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Feed = () => {
  const userDetails = useSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (userDetails && !userDetails.creds.email) {
      router.push("/register");
    }
    return () => {
      console.log("cleaner");
    };
  }, [router, userDetails]);

  return (
    <main className="flex max-w-screen-lg mx-auto pt-8 content-center">
      <div className="flex-[1] h-80 sticky top-24 flex flex-col items-end">
        <Link
          href={`/user/${userDetails.creds.userId}`}
          className="w-12 h-12 rounded-full border hover:bg-black hover:text-white flex items-center justify-center m-8 mt-0 shadow-md transition duration-300"
        >
          <User />
        </Link>
        <Link
          href="/user/bookmarks"
          className="w-12 h-12 rounded-full border hover:bg-black hover:text-white flex items-center justify-center m-8 mt-0 shadow-md transition duration-300"
        >
          <Bookmark />
        </Link>
      </div>
      <div className="flex flex-[3] gap-2">
        <div className="flex-1 flex flex-col ">
          <CreatePost />
          <Posts />
        </div>
      </div>
      <div className="flex-[2] hidden md:block">
        <TrendingFeed />
      </div>
    </main>
  );
};
export default Feed;
