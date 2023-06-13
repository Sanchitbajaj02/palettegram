import { Download, Heart, MessageCircle, Share } from "react-feather";
import { Link } from "react-router-dom";

const SinglePost = ({ singlePost }) => {
  const post = singlePost;
  // const { postImage } = post;
  const userName = "XYZ";
  return (
    <Link
      className="flex px-4 py-2 mb-4 rounded shadow-lg border-slate-100 border-b-0 last:border-b-1"
      to={`/${post.$id}`}
    >
      <div className="w-full">
        <div className="">
          <Link
            className="flex items-center gap-4 mb-2"
            to={`/${post.userId}`}
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://pbs.twimg.com/media/FyCXwYdWYBULeZW?format=jpg&name=small"
              alt=""
            />
            <span className="font-medium text-md">{userName}</span>
          </Link>
          <p className="text-lg">{post.postTitle}</p>
          <img
            className="w-full"
            src={
              "https://pbs.twimg.com/media/FyB8cZnWIAc21rw?format=jpg&name=360x360"
            }
            alt=""
          />
        </div>
        <div className="flex justify-around">
          <div className="flex items-center gap-2 group text-blue-500">
            <div className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
              <Heart />
            </div>
            <span className="font-light">3213</span>
          </div>

          <div className="flex items-center gap-2 group text-blue-500">
            <div className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
              <MessageCircle />
            </div>
            <span className="font-light">3213</span>
          </div>
          <div className="flex items-center gap-2 group text-blue-500">
            <div className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
              <Share />
            </div>
            <span className="font-light">3213</span>
          </div>
          <div className="p-2 rounded-full flex justify-center items-center text-blue-500 hover:bg-blue-800 hover:text-blue-300">
            <Download />
          </div>
        </div>
      </div>
    </Link>
  );
};
SinglePost.propTypes = {
  singlePost: Array,
};

export default SinglePost;
