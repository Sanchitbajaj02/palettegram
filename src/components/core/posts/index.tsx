"use client";
import { useSelector, useDispatch } from "react-redux";
import { parseCookies } from "nookies";

// Store
import { addLikesToAPost } from "@/redux/reducers/postsReducer";
// import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";

import { PostInstanceType } from "@/types/index.d";

// Api
// import { getAllPosts, likeTweet } from "@/backend/posts.api";
// import { getBookmarks } from "@/backend/bookmarks.api";

import SinglePost from "./SinglePost";

export default function Posts() {
  const postState = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();

  const cookies = parseCookies();

  let copyPosts: PostInstanceType[] = [];

  const likePost = async (post: PostInstanceType) => {
    const userIdFromCookies: string = cookies["accountId"];

    dispatch(
      addLikesToAPost({
        postId: post.$id!,
        userId: userIdFromCookies,
      }),
    );

    // console.log("og:", postState);

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
    copyPosts = copyPosts.filter((post: PostInstanceType) => post.isActive === true);
  }

  if (postState.loading) {
    return <h1 className="text-white text-2xl text-center">Loading...</h1>;
  }

  if (postState.error) {
    return <h1 className="text-white text-2xl text-center">Error...</h1>;
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
