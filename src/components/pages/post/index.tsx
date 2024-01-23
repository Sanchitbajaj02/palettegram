import { Suspense, useState } from "react";

import SinglePost from "@/components/core/posts/SinglePost";
import TrendingFeed from "@/components/core/trendingFeed";

import { PostInstanceType } from "@/types";

import { toastify } from "@/helper/toastify";
import isCtrlEnter from "@/helper/isCtrlEnter";


import { addComment } from "@/backend/posts.api";

import { Loader } from "react-feather";
import Loading from "@/app/feed/loading";

export default function PostById({ singlePostInfo }: { singlePostInfo: PostInstanceType }) {
  const [comment_message, setComment_message] = useState("");
  const [commentCount, setCommentCount] = useState(singlePostInfo?.comments?.length || 0);
  const [loading, setLoading] = useState(false);



  const uploadComment = async (id: string | undefined, comment_message: string) => {
    setLoading(true);
    const previousComments = singlePostInfo.comments;
    try {
      if (previousComments === undefined || !id) return;
      const Comments = [...previousComments, comment_message];
      const res = await addComment(id, Comments);
      setCommentCount(res?.comments.length || singlePostInfo?.comments?.length);
      toastify("Comment added successfully", "success");
      singlePostInfo.comments?.push(comment_message)
      console.log(singlePostInfo)
      setComment_message("");
      setLoading(false)
    } catch (error) {
      console.log(error);
      toastify("Comment cannot be added", "error");
      setLoading(false)
    }
  };


  return (
    <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-8 content-center px-4">
      <div className="flex-[5] mt-2 sm:mt-0">
        <SinglePost singlePost={singlePostInfo} />
        <div className=" flex flex-col shadow dark:shadow-gray-600 p-2 ">
          <div className="relative">
            <textarea
              onChange={(event: any) => setComment_message(event.target.value)}
              value={comment_message}
              name="postTitle"
              className="mt-2 dark:bg-secondary outline-none border-2 border-gray-500 focus:ring rounded-lg p-3 text-black dark:text-white placholder:text-gray-400 text-lg w-full mb-2"
              rows={4}
              cols={50}
              placeholder="Type your comment here"
              onKeyDown={(e) => {
                if (isCtrlEnter(e)) uploadComment(singlePostInfo && singlePostInfo?.$id, comment_message);
              }}
            />
            <button
              onClick={() => {
                uploadComment(singlePostInfo && singlePostInfo?.$id, comment_message);
              }}
              className="absolute left-3 bottom-3 transition-all duration-300 bg-primary hover:bg-primary-light text-white font-normal py-1 px-8 my-3 rounded-full"
            >
              {loading ? (
                <Loader size={24} className="mx-auto animate-spin self-center" />
              ) : (
                <p>post</p>
              )}
            </button>
            <div className=" ">
              {/* <button onClick={handleTest}>test</button> */}
            </div>
          </div>
          <span className="w-full border-[1px] opacity-5 bg-white mt-2 "></span>
          <div className="">
            <Suspense fallback={<Loading />}>
              {singlePostInfo.comments != undefined
                && singlePostInfo.comments?.length > 0
                && singlePostInfo.comments?.slice().reverse().map((comment) => (
                  <ul className="mt-3 p-2 text-left border-[.2px] border-gray-600 rounded-lg ">
                    <li>{comment}</li>
                  </ul>
                ))}
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex-[2] hidden md:block">
        <TrendingFeed />
      </div>
    </main>
  );
}
