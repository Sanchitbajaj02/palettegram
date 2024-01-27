import Link from "next/link";
import { redirect } from 'next/navigation'
import Image from "next/image";
import { Download, Heart, MessageCircle, Share, Bookmark } from "react-feather";
import { PostInstanceType } from "@/types/index.d";
import { parseCookies } from "nookies";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark, saveBookmark, createBookmarkEntry } from "@/backend/bookmarks.api";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";
import { toastify } from "@/helper/toastify";
import { addComment } from "@/backend/posts.api";
import { getUserDetails } from "@/backend/auth.api";
import { useCallback, useEffect, useState } from "react";
import { UserBookMarkType, FormatOnType } from "@/types/index";

import isCtrlEnter from "@/helper/isCtrlEnter";

interface UserDetails {
  fullName: string;
}

export default function SinglePost({
  singlePost,
  onLikeClick,
  width,
}: {
  singlePost: PostInstanceType;
  onLikeClick?: any;
  width?: string;
}) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [commentCount, setCommentCount] = useState(singlePost?.comments?.length || 0);

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);
  const userBookmarks: UserBookMarkType = useSelector((state: any) => state.bookmarks);

  const copyText = async (color: string) => {
    await navigator.clipboard.writeText(color);
  };

  const fetchUserDetails = useCallback(async () => {
    try {
      const detailsArray = await getUserDetails(singlePost.accountId);
      const userDetails = detailsArray && detailsArray.length > 0 ? detailsArray[0] : null;
      setUserDetails(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [singlePost.accountId]);

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

  function createdAtDateFormatter(postCreationTime: string) {
    const timeObj = {
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
      days: 1000 * 60 * 60 * 24,
      postCreatedTime: new Date(postCreationTime),
      currentTime: new Date(),
      calcTimeDiff(formatOn: FormatOnType) {
        const timeDiff = this.currentTime.valueOf() - this.postCreatedTime.valueOf();
        return Math.round(timeDiff / this[formatOn]);
      },
    };

    if (timeObj.calcTimeDiff("seconds") < 60) {
      return `${timeObj.calcTimeDiff("seconds")}s`;
    } else if (timeObj.calcTimeDiff("minutes") < 60) {
      return `${timeObj.calcTimeDiff("minutes")}m`;
    } else if (timeObj.calcTimeDiff("hours") <= 24) {
      return `${timeObj.calcTimeDiff("hours")}h`;
    } else if (timeObj.calcTimeDiff("days") < 365) {
      return `${timeObj.calcTimeDiff("days")}d`;
    } else {
      return `${timeObj.calcTimeDiff("days") / 365}y`;
    }
  }

  const handleUpdateBookmark = async (postId: string | undefined) => {
    if (postId) {
      const cookies = parseCookies();
      const accountId: string = cookies["accountId"];
      if (Array.isArray(userBookmarks.bookmark)) {
        if (userBookmarks.bookmark.some((current: string) => current === postId)) {
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
            toastify("Bookmark saved", "success");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <div
      className={` ${width
        ? "w-96 p-3 m-auto  rounded-md shadow dark:shadow-gray-600 mb-4 mt-40 "
        : "p-3 rounded-md shadow dark:shadow-gray-600 mb-4"
        } `}
    >
      <Link
        className="flex items-center gap-3 mb-3"
        href={`/user/${singlePost && singlePost?.accountId}`}
      >
        <div className="w-12 h-12 rounded-full border flex items-center justify-center shadow">
          <Image src="/assets/user.png" alt="user" width={40} height={40} />
        </div>
        <div>
          <h5 className="font-medium text-base">
            {userDetails ? userDetails.fullName : "Anonymous User"}
          </h5>
          {singlePost?.$createdAt ? (
            <p className="font-thin text-xs/[10px] text-slate-950 dark:text-slate-400">{`${createdAtDateFormatter(
              singlePost.$createdAt,
            )} ago`}</p>
          ) : null}
        </div>
      </Link>
      <Link href={`/post/${singlePost && singlePost?.$id}`}>
        <p className="text-md mb-4">
          {singlePost && singlePost?.postTitle ? singlePost?.postTitle : "No Title"}
        </p>

        {singlePost && singlePost?.postImages && singlePost?.postImages[0]?.length > 0 ? (
          <Image
            className="w-full mb-4"
            src={singlePost?.postImages[0]}
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
          className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer ${singlePost?.likes && singlePost?.likes.includes(authState?.userId)
            ? "text-primary hover:text-primary"
            : "text-secondary-light dark:text-white hover:text-primary dark:hover:text-primary"
            }`}
        >
          <Heart
            size={22}
            fill="true"
            className={`${singlePost?.likes && singlePost?.likes.includes(authState?.userId)
              ? "fill-primary"
              : "fill-transparent"
              }`}
          />
          <span className="text-base">
            {singlePost && singlePost?.likes && singlePost?.likes.length}
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
            <span className="text-base">{singlePost.comments?.length} </span>
          )}
        </Link>

        <article
          onClick={() => handleUpdateBookmark(singlePost?.$id)}
          className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer ${userBookmarks &&
            userBookmarks?.bookmark &&
            userBookmarks?.bookmark?.length > 0 &&
            userBookmarks?.bookmark.includes(singlePost && singlePost?.$id!)
            ? "text-primary hover:text-primary dark:hover:text-primary"
            : "text-secondary-light dark:text-white hover:text-primary dark:hover:text-primary"
            }`}
        >
          <Bookmark
            size={22}
            fill="true"
            className={`${userBookmarks &&
              userBookmarks?.bookmark &&
              userBookmarks?.bookmark?.length > 0 &&
              userBookmarks?.bookmark.includes(singlePost && singlePost?.$id!)
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
