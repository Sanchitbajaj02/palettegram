"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "@/redux/reducers/postsReducer";
import { getAllPosts, likeTweet } from "@/backend/posts.api";
import SinglePost from "./SinglePost";
import { PostInstanceType } from "@/types/index.d";

export default function Posts() {
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
        }
      })
      .catch((error) => {
        console.log(error);
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

  if (postState.loading) {
    return <h1>Loading...</h1>;
  }

  if (postState.posts && postState.posts.length > 0) {
    copyPosts = [...postState.posts];

    copyPosts?.sort(
      (a: any, b: any) => new Date(b["$createdAt"]).getTime() - new Date(a["$createdAt"]).getTime(),
    );
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
