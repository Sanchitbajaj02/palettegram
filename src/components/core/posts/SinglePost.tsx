/* eslint-disable quotes */
import Link from "next/link";
import Image from "next/image";
import { Download, Heart, MessageCircle, Share, Bookmark } from "react-feather";
import { useSelector } from "react-redux";
import { PostInstanceType } from "@/types/index.d";

// eslint-disable-next-line react/prop-types
const SinglePost = ({
  singlePost,
  onLikeClick,
}: {
  singlePost: PostInstanceType;
  onLikeClick: any;
}) => {
  console.log(singlePost);

  const post: PostInstanceType = singlePost;

  const authState = useSelector((state: any) => state.authenticator);

  const copyText = async (color: string) => {
    await navigator.clipboard.writeText(color);
  };

  return (
    <div className="p-3 rounded-md shadow dark:shadow-gray-600 mb-4">
      <Link className="flex items-center gap-3 mb-3" href={`/user/${post?.userId}`}>
        <div className="w-12 h-12 rounded-full border flex items-center justify-center shadow">
          <Image src="/assets/user.png" alt="user" width={40} height={40} />
        </div>
        <span className="font-medium text-md">{post?.userId}</span>
      </Link>
      <Link href={`/post/${post?.$id}`}>
        <p className="text-md mb-4">{post?.postTitle ? post?.postTitle : "No Title"}</p>

        {post?.postImage[0]?.length > 0 ? (
          <Image
            className="w-full mb-4"
            src={post?.postImage[0]}
            alt={post?.postTitle}
            width={400}
            height={200}
          />
        ) : null}
      </Link>

      {post.colors && post.colors.length > 0 ? (
        <div className="my-2 flex flex-row justify-between items-center w-full">
          {post.colors.map((color: string, index: number) => {
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
          onClick={() => onLikeClick(post)}
          className={`flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer ${
            post.likes && post.likes.includes(authState?.userId)
              ? "text-primary hover:text-primary"
              : "text-secondary-light dark:text-white hover:text-primary"
          }`}
        >
          <Heart
            size={22}
            fill="true"
            className={`${
              post.likes && post.likes.includes(authState?.userId)
                ? "fill-primary"
                : "fill-transparent"
            }`}
          />
          <span className="text-base">{post.likes && post.likes.length}</span>
        </article>

        <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
          <MessageCircle size={22} />
          <span className="text-base">{post.comments && post.comments.length}</span>
        </article>

        <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
          <Bookmark size={22} />
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
};

export default SinglePost;
