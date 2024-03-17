import Loader from "@/app/loading";
import parse from "html-react-parser";
import { toastify } from "@/helper/toastify";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { postDisplayTimeFormatter } from "@/helper/postDisplayTimeFormatter";
import { getAllUserPosts } from "@/backend/posts.api";
import { Models } from "appwrite";
import SinglePost from "@/components/core/posts/SinglePost";
import { PostInstanceType } from "@/types";
import { useSelector } from "react-redux";

export default function UserPosts({ userId }: { userId: string }) {
  const [userPosts, setUserPosts] = useState<PostInstanceType[]>([]);
  const postState = useSelector((state: any) => state.posts.posts);

  useEffect(() => {
    fetchUserPosts();
    return () => {
      console.log("cleanup");
    };
  }, []);

  useEffect(() => {
    fetchUserPosts();
  }, [postState]);

  const fetchUserPosts = () => {
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
  };

  console.log("all user posts:", userPosts);

  return (
    <>
      <main className="w-full h-full">
        <Suspense fallback={<Loader />}>
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-1">
              {userPosts
                ? userPosts?.map((post: PostInstanceType, index: number) => (
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
