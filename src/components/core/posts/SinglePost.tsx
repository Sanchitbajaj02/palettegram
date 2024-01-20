import Link from "next/link";
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
import isCtrlEnter from "@/helper/isCtrlEnter";
interface UserDetails {
  fullName: string;
}

type FormatOnType = "seconds" | "minutes" | "hours" | "days";
type UserBookMarkType = {
  accountId: string;
  bookmark: string[] | undefined;
  error: boolean;
  loading: boolean;
};
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
  const [comment_message, setComment_message] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
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
      return `${timeObj.calcTimeDiff("seconds")}sec`;
    } else if (timeObj.calcTimeDiff("minutes") < 60) {
      return `${timeObj.calcTimeDiff("minutes")}min`;
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

  const handleComment = () => {
    setShowCommentBox(!showCommentBox);
    console.log("comment");
  };

  const uploadComment = async (id: string | undefined, comment_message: string) => {
    const previousComments = singlePost.comments;
    try {
      if (previousComments === undefined || !id) return;
      const Comments = [...previousComments, comment_message];
      const res = await addComment(id, Comments);
      setCommentCount(res?.comments.length || singlePost?.comments?.length);
      toastify("Comment added successfully", "success");
    } catch (error) {
      console.log(error);
      toastify("Comment cannot be added", "error");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <div
      className={` ${
        width
          ? "w-96 p-3 m-auto  rounded-md shadow dark:shadow-gray-600 mb-4 mt-40 "
          : "p-3  rounded-md shadow dark:shadow-gray-600 mb-4"
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

        <article
          onClick={handleComment}
          className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary"
        >
          <MessageCircle size={22} />
          <span className="text-base">{commentCount}</span>
        </article>

        <article
          onClick={() => handleUpdateBookmark(singlePost?.$id)}
          className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer ${
            userBookmarks &&
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
            className={`${
              userBookmarks &&
              userBookmarks?.bookmark &&
              userBookmarks?.bookmark?.length > 0 &&
              userBookmarks?.bookmark.includes(singlePost && singlePost?.$id!)
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
      {showCommentBox ? (
        <div>
          <div className="flex flex-1">
            <textarea
              onChange={(event: any) => setComment_message(event.target.value)}
              value={comment_message}
              name="postTitle"
              className="mt-2 dark:bg-secondary-light outline-none focus:ring rounded-lg p-3 text-black dark:text-white placholder:text-gray-400 text-lg w-full mb-2"
              rows={2}
              cols={50}
              placeholder="Type your comment here"
              onKeyDown={(e) => {
                if (isCtrlEnter(e)) uploadComment(singlePost && singlePost?.$id, comment_message);
              }}
            />
          </div>
          <div className="flex flex-end">
            <button
              onClick={() => {
                uploadComment(singlePost && singlePost?.$id, comment_message);
              }}
              className="transition-all duration-300 bg-primary hover:bg-primary-light text-white font-normal py-1 px-8 rounded-full"
            >
              {"Post"}
            </button>
            {/* <button onClick={handleTest}>test</button> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}
