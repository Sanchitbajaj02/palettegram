"use client";
import { useSelector, useDispatch } from "react-redux";
import { parseCookies } from "nookies";

// Store
import { addLikesToAPost } from "@/redux/reducers/postsReducer";
import { PostInstanceType } from "@/types/index";
import PostSkeleton from "../../pages/feed/loading";
import SinglePost from "./SinglePost";

export default function Posts() {
  const postState = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();

  const cookies = parseCookies();

  const likePost = async (post: PostInstanceType) => {
    const userIdFromCookies: string = cookies["accountId"];

    dispatch(
      addLikesToAPost({
        postId: post.$id!,
        userId: userIdFromCookies,
      }),
    );

    // likeTweet(post)
    //   .then((response) => {
    //     console.log("original", response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  if (postState.loading) {
    return (
      <h1 className="text-white text-2xl text-center">
        <PostSkeleton />
      </h1>
    );
  }

  if (postState.error) {
    return <h1 className="text-white text-2xl text-center">Error...</h1>;
  }

  return (
    <>
      {postState.posts.length < 0 && <PostSkeleton />}
      {postState.posts &&
        postState.posts.length > 0 &&
        postState.posts?.map((post: PostInstanceType, index: number) => (
          <div key={index} className="w-full">
            <SinglePost singlePost={post} onLikeClick={likePost} />
          </div>
        ))}
    </>
  );
}
