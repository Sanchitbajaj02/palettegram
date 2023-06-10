import { useEffect, useState } from "react";
import SinglePost from "./SinglePost.jsx";
import { getAllPosts } from "../DB/api.js";
const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    getAllPosts()
      .then((res) => {
        setAllPosts(res.documents);
        console.log(allPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const tweetsSortedByCreatedDate = allPosts.sort(function (a, b) {
    return new Date(b.$createdAt) - new Date(a.$createdAt);
  });
  return (
    <div className="flex flex-col items-center w-full">
      {tweetsSortedByCreatedDate.map((posts, index) => (
        <div key={index} className="w-full">
          <SinglePost singlePost={posts} />
        </div>
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
