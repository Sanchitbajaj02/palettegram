"use client";

import SinglePost from "@/components/core/posts/SinglePost";
import { useEffect, useState } from "react";
import { getSinglePost } from "@/backend/posts.api";
import { PostInstanceType } from "@/types";

type Prop = {
  params: {
    id: string;
  };
};

const PostDisplay = ({ params: { id } }: Prop) => {
  const [post, setPost] = useState<PostInstanceType>({
    accountId: "",
    postTitle: "",
    postImages: [],
    colors: [],
    comments: [],
    likes: [],
    $collectionId: "",
    $createdAt: "",
    $id: "",
    isActive: false,
  });

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getSinglePost(id);
        if (res) {
          setPost({
            accountId: res.accountId,
            postTitle: res.postTitle,
            postImages: res.postImages,
            colors: res.colors || [],
            comments: res.comments || [],
            likes: res.likes,
            $id: res.$id || "",
            $collectionId: res.$collectionId || "",
            $createdAt: res.$createdAt || "",
            isActive: res.isActive,
          });
        }
        console.log(res);
      } catch (error: any) {
        console.log("error while fetching single post ", error.message);
      }
    };

    getPost();
  }, [id]);

  return (
    <>
      <SinglePost singlePost={post} width={"w-96"} />
    </>
  );
};

export default PostDisplay;
