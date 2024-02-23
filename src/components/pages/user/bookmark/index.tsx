"use client";
import { useSelector } from "react-redux";
import SinglePost from "@/components/core/posts/SinglePost";
import { ArrowLeft } from "react-feather";
import { useRouter } from "next/navigation";

import { PostInstanceType } from "@/types/index.d";

function getSinglePostData(ids: string, posts: PostInstanceType[]) {
  const singlepost = posts.filter((post: PostInstanceType) => post?.$id === ids)[0];
  return singlepost;
}

export default function UserBookmark() {
  const router = useRouter();

  const userBookmarks = useSelector((state: any) => state.bookmarks);

  const totalPosts = useSelector((state: any) => state.posts);

  if (userBookmarks.error) {
    return <h1 className="text-white text-2xl text-center">Error...</h1>;
  }

  if (userBookmarks.loading) {
    return <h1 className="text-white text-2xl text-center">Loading...</h1>;
  }

  return (
    <>
      <section className="mx-auto max-w-screen-md mt-8">
        <div className="flex gap-4 items-center">
          <ArrowLeft
            size={24}
            onClick={() => {
              router.back();
            }}
            className="hover:cursor-pointer hover:text-primary-light transition-all duration-300"
          />
          <h1 className="text-black dark:text-white text-xl font-bold">My saved items</h1>
        </div>

        <main className="my-8">
          {userBookmarks && userBookmarks?.postId && userBookmarks?.postId.length > 0 ? (
            userBookmarks.postId.map((ids: string, idx: number) => {
              return (
                <div key={idx}>
                  <SinglePost singlePost={getSinglePostData(ids, totalPosts.posts)} />
                </div>
              );
            })
          ) : (
            <h1 className="text-black dark:text-white text-base font-medium">No bookmarks saved</h1>
          )}
        </main>
      </section>
    </>
  );
}
