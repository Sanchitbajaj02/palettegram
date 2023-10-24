"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "@/redux/reducers/postsReducer";
import { getAllPosts, likeTweet } from "@/backend/posts.api";
import SinglePost from "./SinglePost";
import { PostInstanceType } from "@/types/index.d";

export default function Posts() {
  const [load, setLoad] = useState<boolean>(true);
  const auth = useSelector((state: any) => state.auth);
  const postState = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();

  let copyPosts: PostInstanceType[] = [];

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        if (posts && posts?.documents.length > 0) {
          console.log("posts:", posts.documents);

          dispatch(getPosts(posts.documents));
          setLoad(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoad(true);
      });

    return () => {
      console.log("clear");
    };
  }, [dispatch]);

  const likePost = async (post: any) => {
    if (post.likes.includes(auth.userId)) {
      post.likes.pop(auth.userId);
    } else {
      post.likes.push(auth.userId);
    }

    likeTweet(post)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (postState.posts && postState.posts.length > 0) {
    copyPosts = [...postState.posts];

    copyPosts?.sort(
      (a: any, b: any) => new Date(b["$createdAt"]).getTime() - new Date(a["$createdAt"]).getTime(),
    );
  }

  if (postState.loading || load) {
    return <h1 className="text-white text-3xl">Loading...</h1>;
  }

  if (postState.error) {
    return <h1 className="text-white text-3xl">Error...</h1>;
  }

  return (
    <>
      {copyPosts &&
        copyPosts.length > 0 &&
        copyPosts.map((post: PostInstanceType, index: number) => (
          <div key={index} className="w-full">
            <SinglePost singlePost={post} onLikeClick={likePost} />
          </div>
        ))}
    </>
  );
}
