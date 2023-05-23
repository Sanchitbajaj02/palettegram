import React from "react";
import Post from "./Post";
const allposts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Posts = () => {
  return (
    <div class="flex flex-col gap-2">
      {allposts.map((k, index) => (
        <Post key={index} index={index} />
      ))}
    </div>
  );
};
export default Posts;
