import Post from "./Post.jsx";
const Posts = () => {
  const allposts = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {allposts.map((index) => (
        <Post key={index} index={index} />
      ))}
    </div>
  );
};

export default Posts;
/*
  fullName
  avatarImage
  content : Array of strings
  No. of views
*/
