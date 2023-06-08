import { Link } from "react-router-dom";

const SinglePost = (posts) => {
  const post = posts.posts;
  // const { postImage } = post;
  const userName = "XYZ";
  return (
    <Link
      className="border w-full p-4 pb-2 border-b-0 last:border-b"
      to={`/post/${post.$id}`}
    >
      <div className="flex w-full">
        <div className="w-12">
          <Link className="w-12" to={`/user/${post.userId}`}>
            <img
              className="w-8 h-8 rounded-full"
              src="https://pbs.twimg.com/media/FyCXwYdWYBULeZW?format=jpg&name=small"
              alt=""
            />
          </Link>
        </div>
        <div className="w-full">
          <div className="rounded-md">
            <Link className="w-12" to={`/user/${post.userId}`}>
              <span className="font-bold">{userName}</span>
            </Link>
            <p>{post.postTitle}</p>
            <img
              className="w-[90%] border"
              src={
                "https://pbs.twimg.com/media/FyB8cZnWIAc21rw?format=jpg&name=360x360"
              }
              alt=""
            />
          </div>
          <div className="flex justify-start gap-6 p-2">
            <div className="flex items-center gap-3 group text-blue-500">
              <div className="w-8 h-8 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
                <i className="fa fa-heart-o"></i>
              </div>
              <span className="font-light">3213</span>
            </div>

            <div className="flex items-center gap-3 group text-blue-500">
              <div className="w-8 h-8 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
                <i className="fa fa-comment-o"></i>
              </div>
              <span className="font-light">3213</span>
            </div>
            <div className="flex items-center gap-3 group text-blue-500">
              <div className="w-8 h-8 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
                <i className="fa fa-share"></i>
              </div>
              <span className="font-light">3213</span>
            </div>
            <div className="">
              <div className="w-8 h-8 rounded-full flex justify-center items-center text-blue-500 hover:bg-blue-800 hover:text-blue-300">
                <i className="fa fa-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
SinglePost.propTypes = {
  index: Number,
};

export default SinglePost;
