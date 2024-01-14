"use client";

import SinglePost from "@/components/core/posts/SinglePost";
import { useEffect, useState } from "react";
import { getSinglePost } from "@/backend/posts.api";

type Prop = {
  params: {
    id: string;
  };
};

interface postType {
  accountId: string;
  postTitle: string;
  postImages: string[];
  colors?: string[];
  comments?: string[];
  likes: string[];
  $id?: string;
  $collectionId?: string;
  $createdAt?: string;
}

const PostDisplay = ({ params: { id } }: Prop) => {
  const [post, setPost] = useState<postType>({
    accountId: "",
    postTitle: "",
    postImages: [],
    colors: [],
    comments: [],
    likes: [],
    $collectionId: "",
    $createdAt: "",
    $id: "",
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
