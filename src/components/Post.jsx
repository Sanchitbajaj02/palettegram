import { Link } from "react-router-dom";

const Post = ({ index }) => {
  return (
    <Link className="w-[100%] h-80 border" to={`/post/${index}`}>
      <div>Post {index}</div>
    </Link>
  );
};
Post.propTypes = {
  index: Number,
};

export default Post;
