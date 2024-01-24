import Loader from "@/app/loading";
import { removePost } from "@/backend/posts.api";
import { toastify } from "@/helper/toastify";
import { removeUserPost } from "@/redux/reducers/postsReducer";
import { PostInstanceType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Bookmark, Download, Heart, MessageCircle, Share, Trash2 } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { parseCookies } from "nookies";

type FormatOnType = "seconds" | "minutes" | "hours" | "days";

interface UserPostsProps {
  userId: string;
  userName: string;
}

export default function UserPosts({ userId, userName }: UserPostsProps) {
  let userPosts = useSelector((store: any) => store.posts.posts)
    .filter((post: PostInstanceType) => post.accountId === userId && post.isActive === true)
    .reverse();

  const dispatch = useDispatch();
  const cookie = parseCookies();
  const currentUserId: string = cookie["accountId"];

  async function deleteHandler(id: string) {
    console.log(id);
    try {
      const response = await removePost(id);
      if (response) {
        console.log(response);
        dispatch(removeUserPost(response.$id));
        toastify("Post deleted sucessfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function createdAtDateFormatter(postCreationTime: string) {
    const timeObj = {
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
      days: 1000 * 60 * 60 * 24,
      postCreatedTime: new Date(postCreationTime),
      currentTime: new Date(),
      calcTimeDiff(formatOn: FormatOnType) {
        const timeDiff = this.currentTime.valueOf() - this.postCreatedTime.valueOf();
        return Math.round(timeDiff / this[formatOn]);
      },
    };

    if (timeObj.calcTimeDiff("seconds") < 60) {
      return `${timeObj.calcTimeDiff("seconds")}s`;
    } else if (timeObj.calcTimeDiff("minutes") < 60) {
      return `${timeObj.calcTimeDiff("minutes")}m`;
    } else if (timeObj.calcTimeDiff("hours") <= 24) {
      return `${timeObj.calcTimeDiff("hours")}h`;
    } else if (timeObj.calcTimeDiff("days") < 365) {
      return `${timeObj.calcTimeDiff("days")}d`;
    } else {
      return `${timeObj.calcTimeDiff("days") / 365}y`;
    }
  }
  return (
    <>
      <main className="w-full h-full">
        <Suspense fallback={<Loader />}>
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-8">
              {userId &&
                userPosts?.map((post: any, index: number) => (
                  <div
                    className="p-4 rounded-md shadow dark:shadow-gray-600 z-10 w-full h-full relative"
                    key={index}
                  >
                    <section className="flex w-full h-full justify-start items-start gap-3 ">
                      <div className="h-full flex flex-col">
                        <Link href={`/user/${post?.accountId}`}>
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
                          <Link href={`/user/${post?.accountId}`}>
                            <p className=" font-semibold">{userName}</p>
                            <p className="text-[13px] text-neutral-600 dark:text-neutral-400 ">
                              {`${createdAtDateFormatter(post?.$createdAt)} ago`}
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

                        <p className="text-neutral-900 dark:text-neutral-200">{post?.postTitle}</p>
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
                            <p className="text-xs sm:text-base">{post?.likes.length}</p>
                          </article>

                          <article className="flex flex-row gap-1 sm:gap-2 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-neutral-200 hover:text-primary">
                            <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6" />
                            <p className="text-xs sm:text-base">{post?.comments?.length}</p>
                          </article>

                          <article className="flex flex-row gap-1 sm:gap-2 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-neutral-200 hover:text-primary">
                            <Bookmark className="h-4 w-4 sm:h-6 sm:w-6" />

                            <p className="text-xs sm:text-base">{post?.likes.length}</p>
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
                ))}
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
