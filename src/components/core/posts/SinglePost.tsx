import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
import { Download, Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { PostInstanceType } from "@/types/index.d";
import { parseCookies } from "nookies";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark, saveBookmark, createBookmarkEntry } from "@/backend/bookmarks.api";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";
import { toastify } from "@/helper/toastify";
import { useState, MouseEvent } from "react";
import { UserBookMarkType } from "@/types/index";
import { postDisplayTimeFormatter } from "@/helper/postDisplayTimeFormatter";
import { userCollectionDB } from "@/types/auth";

export default function SinglePost({
  singlePost,
  onLikeClick,
  width,
}: {
  singlePost: PostInstanceType;
  onLikeClick?: any;
  width?: string;
}) {
  const [commentCount, setCommentCount] = useState(singlePost?.commentsCount || 0);

  const dispatch = useDispatch();

  const userBookmarks: UserBookMarkType = useSelector((state: any) => state.bookmarks);

  const sharePost = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: singlePost?.postTitle,
          text: singlePost?.postTitle,
          url: `${window.location.origin}/post/${singlePost?.$id}`,
        });
      } else {
        // Fallback for browsers that do not support Web Share API
        alert("Web Share API not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleUpdateBookmark = async (postId: string | undefined) => {
    if (postId) {
      const cookies = parseCookies();
      const userId: string = cookies["userId"];

      if (Array.isArray(userBookmarks.postId)) {
        if (userBookmarks.postId.some((current: string) => current === postId)) {
          removeBookmark(userId, postId)
            .then((resp) => {
              dispatch(
                saveBookmarkToStore({
                  userId: resp.userId?.$id,
                  postId: resp.postId,
                }),
              );

              toastify("Bookmark removed", "success");
            })
            .catch((err) => console.log(err));
        } else {
          saveBookmark(userId, postId)
            .then((resp) => {
              dispatch(
                saveBookmarkToStore({
                  userId: resp.userId?.$id,
                  postId: resp.postId,
                }),
              );
              toastify("Bookmark saved", "success");
            })
            .catch((err) => console.log(err));
        }
      } else {
        // console.log(accountId, "account not exist");
        createBookmarkEntry(userId, postId)
          .then((resp) => {
            dispatch(
              saveBookmarkToStore({
                userId: resp.userId?.$id,
                postId: resp.postId,
              }),
            );
            toastify("Bookmark saved", "success");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement | HTMLSpanElement>) => {
    const element = e.target as HTMLDivElement | HTMLSpanElement;
    const spanElement = element.querySelector("span");
    let currentSelectedElement: HTMLSpanElement | HTMLDivElement | null = null;
    if (spanElement) {
      currentSelectedElement = spanElement;
    } else {
      currentSelectedElement = element;
    }
    if (currentSelectedElement && currentSelectedElement.textContent) {
      const prevValue = currentSelectedElement.textContent;
      navigator.clipboard
        .writeText(currentSelectedElement.textContent)
        .then(() => {
          if (currentSelectedElement) {
            currentSelectedElement.textContent = "Copied";
            currentSelectedElement.classList.remove("bg-slate-950/[0.4]");
            currentSelectedElement.classList.add("bg-black");
            setTimeout(() => {
              if (currentSelectedElement) {
                currentSelectedElement.textContent = prevValue;
                currentSelectedElement.classList.remove("bg-black");
                currentSelectedElement.classList.add("bg-slate-950/[0.4]");
              }
            }, 1000);
          }
        })
        .catch(console.log);
    }
  };

  // color object parsed seperately
  const colorsObject =
    singlePost?.colors && typeof singlePost?.colors === "string" && JSON.parse(singlePost.colors);

  // fetch user seperately
  const relationedUser: userCollectionDB | null =
    singlePost && typeof singlePost.userId !== "string" ? singlePost.userId : null;

  console.log("relationedUser:", relationedUser);

  return (
    <div
      className={` ${
        width
          ? "w-96 p-3 m-auto rounded-md shadow dark:shadow-gray-600 mb-4 mt-40 "
          : "p-3 rounded-md shadow dark:shadow-gray-600 mb-4"
      } `}
    >
      {/* show user info */}
      <Link
        className="flex items-center gap-3 mb-3"
        href={`/user/${relationedUser && relationedUser.$id ? relationedUser.$id : null}`}
      >
        <div className="w-12 h-12 rounded-full border flex items-center justify-center shadow">
          <Image src="/assets/user.png" alt="user" width={40} height={40} />
        </div>
        <div>
          <h5 className="font-medium text-base">
            {relationedUser && relationedUser.fullName ? relationedUser.fullName : "Anonymous User"}
          </h5>
          {singlePost && singlePost.$createdAt ? (
            <p className="font-thin text-xs/[10px] text-slate-950 dark:text-slate-400">
              {postDisplayTimeFormatter(singlePost.$createdAt)} ago
            </p>
          ) : null}
        </div>
      </Link>

      {/* show post info */}
      <Link href={`/post/${singlePost && singlePost?.$id}`}>
        <div className="text-md mb-4">
          {singlePost && singlePost?.postTitle ? (
            <div className="prose dark:prose-invert">{parse(singlePost?.postTitle)}</div>
          ) : (
            "No Title"
          )}
        </div>

        {singlePost && singlePost?.postImages && singlePost?.postImages[0]?.length > 0 ? (
          <Image
            priority
            className="w-full mb-4"
            src={singlePost?.postImages[0]}
            alt={singlePost && singlePost?.postTitle}
            width={400}
            height={200}
          />
        ) : null}
      </Link>

      {/* show colors */}
      {colorsObject && Object.keys(colorsObject).length > 0 ? (
        <div className="my-2 flex flex-row justify-between items-center w-full">
          <div className="w-full  h-[200px] bg-tranparent mx-auto flex mb-3.5 gap-1">
            <div
              className="cursor-pointer w-full flex justify-center items-center group"
              style={{
                backgroundColor:
                  (typeof colorsObject.color01 === "string" && colorsObject.color01) || "",
              }}
              onClick={handleClick}
            >
              <span
                className="bg-slate-950/[0.4] text-xs px-0.5 opacity-0 transition ease-out duration-300 group-hover:opacity-100 group-hover:ease-in group-hover:scale-110"
                onClick={handleClick}
              >
                {colorsObject.color01}
              </span>
            </div>
            <div
              className="cursor-pointer w-full flex justify-center items-center group "
              style={{
                backgroundColor:
                  (typeof colorsObject.color02 === "string" && colorsObject.color02) || "",
              }}
              onClick={handleClick}
            >
              <span className="bg-slate-950/[0.4] text-xs px-0.5 opacity-0 transition ease-out duration-300 group-hover:opacity-100 group-hover:ease-in group-hover:scale-110">
                {colorsObject.color02}
              </span>
            </div>
            <div
              className="cursor-pointer w-full flex justify-center items-center group gap-2"
              style={{
                backgroundColor:
                  (typeof colorsObject.color03 === "string" && colorsObject.color03) || "",
              }}
              onClick={handleClick}
            >
              <span className="bg-slate-950/[0.4] text-xs px-0.5 opacity-0 transition ease-out duration-300 group-hover:opacity-100 group-hover:ease-in group-hover:scale-110">
                {colorsObject.color03}
              </span>
            </div>
            <div
              className="cursor-pointer w-full flex justify-center items-center group"
              style={{
                backgroundColor:
                  (typeof colorsObject.color04 === "string" && colorsObject.color04) || "",
              }}
              onClick={handleClick}
            >
              <span className="bg-slate-950/[0.4] text-xs px-0.5 opacity-0 transition ease-out duration-300 group-hover:opacity-100 group-hover:ease-in group-hover:scale-110">
                {colorsObject.color04}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* reactions */}
      <div className="flex justify-around">
        <article
          onClick={() => onLikeClick(singlePost)}
          className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer"
        >
          <Heart size={22} fill="true" />
          <span className="text-base">
            {singlePost && singlePost?.likesCount && singlePost?.likesCount}
          </span>
        </article>

        <Link
          href={`/post/${singlePost && singlePost?.$id}`}
          className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary"
        >
          <MessageCircle size={22} />
          {commentCount ? (
            <span className="text-base">{commentCount}</span>
          ) : (
            <span className="text-base">{singlePost?.commentsCount} </span>
          )}
        </Link>

        <article
          onClick={() => handleUpdateBookmark(singlePost?.$id)}
          className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer ${
            userBookmarks &&
            userBookmarks?.postId &&
            userBookmarks?.postId?.length > 0 &&
            userBookmarks?.postId.includes(singlePost && singlePost?.$id!)
              ? "text-primary hover:text-primary dark:hover:text-primary"
              : "text-secondary-light dark:text-white hover:text-primary dark:hover:text-primary"
          }`}
        >
          <Bookmark
            size={22}
            fill="true"
            className={`${
              userBookmarks &&
              userBookmarks?.postId &&
              userBookmarks?.postId?.length > 0 &&
              userBookmarks?.postId.includes(singlePost && singlePost?.$id!)
                ? "fill-primary"
                : "fill-transparent"
            }`}
          />
        </article>

        <article
          onClick={sharePost}
          className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary"
        >
          <Share size={22} />
        </article>

        <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
          <Download size={22} />
        </article>
      </div>
    </div>
  );
}
