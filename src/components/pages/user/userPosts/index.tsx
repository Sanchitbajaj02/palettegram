import Loader from "@/app/loading";
import { removePost } from "@/backend/posts.api";
import parse from "html-react-parser";
import { toastify } from "@/helper/toastify";
import { removeUserPost } from "@/redux/reducers/postsReducer";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Bookmark, Download, Heart, MessageCircle, Share, Trash2 } from "lucide-react";
import { parseCookies } from "nookies";
import { postDisplayTimeFormatter } from "@/helper/postDisplayTimeFormatter";
import { getAllUserPosts } from "@/backend/posts.api";
import { Models } from "appwrite";

export default function UserPosts({ userId }: { userId: string }) {
  const cookie = parseCookies();
  const currentUserId: string = cookie["accountId"];

  async function deleteHandler(id: string) {
    try {
      const response = await removePost(id);
      if (response) {
        dispatch(removeUserPost(response.$id));
        toastify("Post deleted sucessfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(userId);

  const [userPosts, setUserPosts] = useState<Models.Document[]>([]);

  useEffect(() => {
    getAllUserPosts(userId)
      .then((allPosts: Models.Document[] | undefined) => {
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
            <div className="grid grid-cols-1 gap-8">
              {userPosts
                ? userPosts?.map((post: any, index: number) => (
                    <div
                      className="p-4 rounded-md shadow dark:shadow-gray-600 z-10 w-full h-full relative"
                      key={index}
                    >
                      <section className="flex w-full h-full justify-start items-start gap-3 ">
                        <div className="h-full flex flex-col">
                          <Link href={`/user/${post?.userId?.$id}`}>
                            <Image
                              src="/assets/user.png"
                              alt="user"
                              width={40}
                              height={40}
                              className="object-contain border p-0.5 rounded-full bg-slate-500"
                            />
                          </Link>

                          <div className="my-[2px] w-px h-full self-center bg-neutral-400 dark:bg-neutral-500 rounded-3xl" />
                        </div>

                        <section className=" flex h-auto w-full flex-col items-start">
                          <div className="flex justify-between text-lg  w-full mb-2">
                            <Link href={`/user/${post?.userId?.$id}`}>
                              <p className=" font-semibold">{post?.userId?.fullName}</p>
                              <p className="text-[13px] text-neutral-600 dark:text-neutral-400 ">
                                {postDisplayTimeFormatter(post?.$createdAt)} ago
                              </p>
                            </Link>

                            {post?.accountId === currentUserId && (
                              <Trash2
                                onClick={() => deleteHandler(post.$id)}
                                size={24}
                                cursor={"pointer"}
                              />
                            )}
                          </div>

                          <div className="prose dark:prose-invert">{parse(post?.postTitle)}</div>
                          <div className="h-auto w-full relative mt-2">
                            {post && post?.postImages && post?.postImages[0].length > 0 ? (
                              <Image
                                className="w-full h-full mb-4 rounded-md"
                                src={post?.postImages[0]}
                                alt=""
                                width={400}
                                height={200}
                              />
                            ) : null}
                          </div>

                          <div className="flex justify-between w-full pt-3 ">
                            <article className="flex flex-row gap-1 sm:gap-2 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-neutral-200 hover:text-primary">
                              <Heart className="h-4 w-4 sm:h-6 sm:w-6" />
                              <p className="text-xs sm:text-base">{post?.likesCounts}</p>
                            </article>

                            <article className="flex flex-row gap-1 sm:gap-2 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-neutral-200 hover:text-primary">
                              <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6" />
                              <p className="text-xs sm:text-base">{post?.commentsCount}</p>
                            </article>

                            <article className="flex flex-row gap-1 sm:gap-2 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-neutral-200 hover:text-primary">
                              <Bookmark className="h-4 w-4 sm:h-6 sm:w-6" />

                              <p className="text-xs sm:text-base">{post?.likesCount}</p>
                            </article>
                            <article className="flex flex-row gap-1 sm:gap-2 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-neutral-200 hover:text-primary">
                              <Share className="h-4 w-4 sm:h-6 sm:w-6" />
                            </article>

                            <article className="flex flex-row gap-1 sm:gap-2 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-neutral-200 hover:text-primary">
                              <Download className="h-4 w-4 sm:h-6 sm:w-6" />
                            </article>
                          </div>
                        </section>
                      </section>
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
