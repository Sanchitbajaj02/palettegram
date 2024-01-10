"use client";

import { Download, Heart, MessageCircle, Share, Bookmark } from "react-feather";
import { useEffect, useState } from "react";
import { getSinglePost } from "@/backend/posts.api";
import { useSelector, useDispatch } from "react-redux";


interface postType {
  postTitle: string;
  likes: string[];
  comments: string[];
  // bookmarks : string[];
}

export default function Post({ id }: { id: string }) {
  
  const [post, setPost] = useState<postType>({
    postTitle: "",
    likes: [],
    comments: [],
    // bookmarks : []
  });

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getSinglePost(id);
        if (res) {
          // console.log(res);
          const data: postType = {
            postTitle: res.postTitle,
            likes: res.likes,
            comments: res.comments,
          };
          console.log(data);
          setPost(data);
        }
      } catch (error: any) {
        console.log("error while fetching single post ", error.message);
      }
    };

    getPost();
    
  }, [id]);
  const authState = useSelector((state: any) => state.auth);

  return (
    <div className=" text-center  w-1/2  mt-52 m-auto ">
      <div
        className="p-8 rounded-md shadow dark:shadow-gray-600 z-10 
         w-96  h-full  ml-36 "
      >
        <p className="mb-4">{post?.postTitle}</p>
        {/* <div className="relative flex justify-between items-center">
                <p className="flex items-center gap-2 font-bold">
                  <Heart size={24} />
                  {post?.likes?.length}
                </p>
                <p className="flex items-center gap-2 font-bold">
                  <MessageCircle size={24} />
                  {post?.comments?.length}
                </p>
              </div> */}
        <div className="flex mt-14 justify-around">
          <article
            className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer dark:text-white hover:text-primary dark:hover:text-primary"
          }`}
          >
            <Heart
              size={22}
              
              
            />
            <span className="text-base">{post?.likes && post?.likes.length}</span>
          </article>

          <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
            <MessageCircle size={22} />
            <span className="text-base">{post?.comments && post?.comments.length}</span>
          </article>

          <article
           
            className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer 
                
                 "text-secondary-light dark:text-white hover:text-primary dark:hover:text-primary"
            }`}
          >
            <Bookmark
              size={22}
              
              
            />
          </article>

          <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
            <Share size={22} />
          </article>

          <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
            <Download size={22} />
          </article>
        </div>
      </div>
    </div>
  );
}
