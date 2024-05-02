"use client";
import Loader from "@/app/loading";
import { toastify } from "@/helper/toastify";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { parseCookies } from "nookies";
import { postDisplayTimeFormatter } from "@/helper/postDisplayTimeFormatter";
import { getAllUserPosts } from "@/backend/posts.api";
import { Models } from "appwrite";
import SinglePost from "@/components/core/posts/SinglePost";
import { PostInstanceType } from "@/types";
import { useSelector } from "react-redux";

export default function UserPosts({ userId }: { userId: string }) {
  const [userPosts, setUserPosts] = useState<Models.Document[] | PostInstanceType[]>([]);

  const memoizedUserPosts = useMemo(
    () => async () => {
      try {
        const allPosts: Models.Document[] | undefined = await getAllUserPosts(userId);

        if (allPosts && allPosts.length > 0) {
          setUserPosts(allPosts);
        }
      } catch (error: any) {
        console.log(error);
        toastify("error fetching posts", "error");
      }
    },
    [userId],
  );

  useEffect(() => {
    getAllUserPosts(userId)
      .then((allPosts: any | undefined) => {
        console.log("posts inside api", allPosts);
        if (allPosts && allPosts.length > 0) {
          setUserPosts(allPosts);
        }
      })
      .catch((err) => {
        console.log(err);
        toastify("error fetching posts", "error");
      });

    return () => {
      console.log("cleanup");
    };
  }, [userId]);

  console.log("all user posts:", userPosts);

  return (
    <>
      <main className="w-full h-full">
        <Suspense fallback={<Loader />}>
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-1">
              {userPosts && userPosts.length > 0
                ? userPosts?.map((post: any, index: number) => (
                    <div key={index}>
                      {post.isActive && <SinglePost singlePost={post} profileSection />}
                    </div>
                  ))
                : "No user posts"}
            </div>

            {userId && userPosts?.length === 0 && (
              <p className="text-center text-xl font-medium">No Posts Yet</p>
            )}
          </div>
        </Suspense>
      </main>
    </>
  );
}

function dispatch(arg0: { payload: string; type: "posts/removeUserPost" }) {
  throw new Error("Function not implemented.");
}
