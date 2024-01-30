import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import SinglePost from "@/components/core/posts/SinglePost";
import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";

import { PostInstanceType } from "@/types";
import { ArrowLeft } from "react-feather";


import { toastify } from "@/helper/toastify";
import isCtrlEnter from "@/helper/isCtrlEnter";


import { addComment } from "@/backend/posts.api";

import { Loader } from "react-feather";
import Loading from "@/app/feed/loading";
import Comment from "@/components/core/comment";

export default function PostById({ singlePostInfo, onLikeClick }: { singlePostInfo: PostInstanceType, onLikeClick?: any; }) {
 const router = useRouter();
 let CHAR_LIMIT = 250;
 const [comment_message, setComment_message] = useState("");
 const [commentCount, setCommentCount] = useState(singlePostInfo?.comments?.length || 0);
 const [loading, setLoading] = useState(false);






 const uploadComment = async (id: string | undefined, comment_message: string) => {
  setLoading(true);
  const previousComments = singlePostInfo.comments;
  try {
   if (previousComments === undefined || !id) return;
   if (comment_message === "") {
    toastify("Comment can not be empty", "error")
    setLoading(false)
    return;
   }
   const Comments = [...previousComments, comment_message];
   const res = await addComment(id, Comments);
   setCommentCount(res?.comments.length || singlePostInfo?.comments?.length);
   toastify("Comment added successfully", "success");
   singlePostInfo.comments?.push(comment_message)
   setComment_message("");
   setLoading(false)
  } catch (error) {
   console.log(error);
   toastify("Comment cannot be added", "error");
   setLoading(false)
  }
 };


 return (
  <>
   <main className="flex flex-col sm:flex-row  max-w-screen-lg mx-auto pt-8 content-center px-4">
    <div className="flex-[1]">
     <button onClick={() => router.back()} className="text-primary hover:text-primary-light">
      <ArrowLeft size={20} className="mr-2" />
      {"Back"}
     </button>
    </div>
    <div>
     <div className="flex-[5] mt-4 sm:mt-0">
      <div className="flex-[5] mt-2 sm:mt-0">
       <SinglePost singlePost={singlePostInfo} onLikeClick={singlePostInfo} />
       <div className=" flex flex-col shadow dark:shadow-gray-600 p-2 ">
        <div className="relative">

         <textarea
          onChange={(event: any) => setComment_message(event.target.value)}
          value={comment_message}
          name="comment"
          className="dark:bg-secondary-light outline-none focus:ring rounded-lg p-3 text-black dark:text-white placholder:text-gray-400 text-lg w-full mb-2"
          rows={4}
          cols={50}
          placeholder="Type your comment here"
          maxLength={CHAR_LIMIT}
          required
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
        </div>
        <div className=" ">
         {/* <button onClick={handleTest}>test</button> */}
        </div>
       </div>
       <div>
        {singlePostInfo.comments?.length == 0 &&
         <h1 className="text-white text-2xl text-center mt-5">There are no Comments!</h1>
        }
        <Suspense fallback={<Loading />}>
         {singlePostInfo.comments != undefined
          && singlePostInfo.comments?.length > 0
          && singlePostInfo.comments?.slice().reverse().map((comment, idx) => (
           <ul key={idx} className="rounded-lg">
            <Comment comment={comment} />
           </ul>
          ))}
        </Suspense>
       </div>
      </div>

     </div>
    </div>
    <div className="flex-[2] hidden md:block">
     <TrendingFeed />
    </div>
   </main>
  </>
 );
}
