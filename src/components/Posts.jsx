import Post from "./Post.jsx";
const Posts = () => {
  const allposts = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      {allposts.map((index) => (
        <Post key={index} />
      ))}
    </div>
  );
};

export default Posts;
