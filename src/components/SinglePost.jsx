import { Link } from "react-router-dom";

const SinglePost = (posts) => {
  const post = posts.posts;
  return (
    <Link className="w-[100%] h-80 border" to={`/post/${post.$userId}`}>
      <div>{post.postTitle}</div>
    </Link>
  );
};
SinglePost.propTypes = {
  index: Number,
};

export default SinglePost;
