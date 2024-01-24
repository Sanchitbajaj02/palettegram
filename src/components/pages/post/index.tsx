import { Suspense } from "react";
import SinglePost from "@/components/core/posts/SinglePost";
import TrendingFeed from "@/components/core/trendingFeed";
import { PostInstanceType } from "@/types";

export default function PostById({ singlePostInfo }: { singlePostInfo: PostInstanceType }) {
  return (
    <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-8 content-center px-4">
      <div className="flex-[5] mt-4 sm:mt-0">
        <SinglePost singlePost={singlePostInfo} />
      </div>
      <div className="flex-[2] hidden md:block">
        <TrendingFeed />
      </div>
    </main>
  );
}
