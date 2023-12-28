import Link from "next/link";
import Image from "next/image";
import { Download, Heart, MessageCircle, Share, Bookmark } from "react-feather";
import { PostInstanceType } from "@/types/index.d";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark, saveBookmark, createBookmarkEntry } from "@/backend/bookmarks.api";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";
import { toastify } from "@/helper/toastify";

export default function SinglePost({
  singlePost,
  onLikeClick,
}: {
  singlePost: PostInstanceType;
  onLikeClick?: any;
}) {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const userBookmarks = useSelector((state: any) => state.bookmarks);

  const copyText = async (color: string) => {
    await navigator.clipboard.writeText(color);
  };

  const handleUpdateBookmark = async (accountId: string, postId: string) => {
    if (userBookmarks.accountId === accountId) {
      if (
        userBookmarks.bookmark.reduce(
          (prev: any, current: any) => prev || current === postId,
          false,
        )
      ) {
        // console.log(accountId, "remove bookmark");
        removeBookmark(accountId, postId)
          .then((resp) => {
            dispatch(
              saveBookmarkToStore({
                accountId: resp.accountId,
                bookmark: resp.bookmark,
              }),
            );

            toastify("Bookmark removed", "success");
          })
          .catch((err) => console.log(err));
      } else {
        // console.log(accountId, "save bookmark");
        saveBookmark(accountId, postId)
          .then((resp) => {
            dispatch(
              saveBookmarkToStore({
                accountId: resp.accountId,
                bookmark: resp.bookmark,
              }),
            );
            toastify("Bookmark saved", "success");
          })
          .catch((err) => console.log(err));
      }
    } else {
      // console.log(accountId, "account not exist");
      createBookmarkEntry(accountId, postId)
        .then((resp) => {
          dispatch(
            saveBookmarkToStore({
              accountId: resp.accountId,
              bookmark: resp.bookmark,
            }),
          );
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <div className="p-3 rounded-md shadow dark:shadow-gray-600 mb-4">
      <Link
        className="flex items-center gap-3 mb-3"
        href={`/user/${singlePost && singlePost?.accountId}`}
      >
        <div className="w-12 h-12 rounded-full border flex items-center justify-center shadow">
          <Image src="/assets/user.png" alt="user" width={40} height={40} />
        </div>
        <span className="font-medium text-md">{singlePost && singlePost?.accountId}</span>
      </Link>
      <Link href={`/post/${singlePost && singlePost?.$id}`}>
        <p className="text-md mb-4">
          {singlePost && singlePost?.postTitle ? singlePost?.postTitle : "No Title"}
        </p>

        {singlePost && singlePost?.postImage && singlePost?.postImage[0].length > 0 ? (
          <Image
            className="w-full mb-4"
            src={singlePost?.postImage[0]}
            alt={singlePost && singlePost?.postTitle}
            width={400}
            height={200}
          />
        ) : null}
      </Link>

      {singlePost?.colors && singlePost?.colors.length > 0 ? (
        <div className="my-2 flex flex-row justify-between items-center w-full">
          {singlePost?.colors.map((color: string, index: number) => {
            return (
              <div
                key={index}
                className="flex-grow h-52 cursor-pointer  transition duration-200"
                onClick={() => copyText(`#${color}`)}
                style={{
                  backgroundColor: `#${color}`,
                }}
              ></div>
            );
          })}
        </div>
      ) : null}

      <div className="flex justify-around">
        <article
          onClick={() => onLikeClick(singlePost)}
          className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer ${
            singlePost?.likes && singlePost?.likes.includes(authState?.userId)
              ? "text-primary hover:text-primary"
              : "text-secondary-light dark:text-white hover:text-primary dark:hover:text-primary"
          }`}
        >
          <Heart
            size={22}
            fill="true"
            className={`${
              singlePost?.likes && singlePost?.likes.includes(authState?.userId)
                ? "fill-primary"
                : "fill-transparent"
            }`}
          />
          <span className="text-base">
            {singlePost && singlePost?.likes && singlePost?.likes.length}
          </span>
        </article>

        <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
          <MessageCircle size={22} />
          <span className="text-base">{singlePost?.comments && singlePost?.comments.length}</span>
        </article>

        <article
          onClick={() => handleUpdateBookmark(singlePost?.accountId, singlePost?.$id!)}
          className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer ${
            userBookmarks &&
            userBookmarks?.bookmark?.length > 0 &&
            userBookmarks?.bookmark.includes(singlePost && singlePost?.$id)
              ? "text-primary hover:text-primary dark:hover:text-primary"
              : "text-secondary-light dark:text-white hover:text-primary dark:hover:text-primary"
          }`}
        >
          <Bookmark
            size={22}
            fill="true"
            className={`${
              userBookmarks &&
              userBookmarks?.bookmark.length > 0 &&
              userBookmarks?.bookmark.includes(singlePost && singlePost?.$id)
                ? "fill-primary"
                : "fill-transparent"
            }`}
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
  );
}
