"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { parseCookies } from "nookies";

// Store
import { getPosts, addLikesToAPost } from "@/redux/reducers/postsReducer";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";

import { PostInstanceType } from "@/types/index.d";

// Api
import { getAllPosts, likeTweet } from "@/backend/posts.api";
import { getBookmarks } from "@/backend/bookmarks.api";

import SinglePost from "./SinglePost";

export default function Posts() {
  const [load, setLoad] = useState<boolean>(true);
  const postState = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();

  const cookies = parseCookies();

  let copyPosts: PostInstanceType[] = [];

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        if (posts && posts?.documents.length > 0) {
          dispatch(getPosts(posts.documents));
          setLoad(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoad(true);
      });

    getBookmarks(cookies["userId"])
      .then((bookm) => {
        console.log(bookm);
        dispatch(
          saveBookmarkToStore({
            accountId: cookies["userId"],
            bookmark: bookm?.documents[0].bookmark,
          }),
        );
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setLoad(true);
      });

    return () => {
      console.log("clear");
    };
  }, [dispatch]);

  const likePost = async (post: PostInstanceType) => {
    const userIdFromCookies: string = cookies["userId"];

    dispatch(
      addLikesToAPost({
        postId: post.$id!,
        userId: userIdFromCookies,
      }),
    );

    console.log("og:", postState);

    // likeTweet(post)
    //   .then((response) => {
    //     console.log("original", response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
