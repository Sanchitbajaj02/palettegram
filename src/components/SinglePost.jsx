import { Link } from "react-router-dom";

const SinglePost = ({ index }) => {
  return (
    <Link className="w-[100%] h-80 border" to={`/post/${index}`}>
      <div>Post {index}</div>
    </Link>
  );
};
SinglePost.propTypes = {
  index: Number,
};

export default SinglePost;
