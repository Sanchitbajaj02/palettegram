import { useEffect, useState } from "react";
import SinglePost from "./SinglePost.jsx";
import { getAllPosts, likeTweet } from "../DB/api.js";
import { useSelector } from "react-redux";
const Posts = () => {
  const registerDetails = useSelector((state) => state.authenticator);
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    getAllPosts()
      .then((res) => {
        setAllPosts(res.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allPosts]);
  const likePost = async (post) => {
    if (post.likes.includes(registerDetails.userId)) {
      post.likes.pop(registerDetails.userId);
    } else {
      post.likes.push(registerDetails.userId);
    }

    likeTweet(post)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tweetsSortedByCreatedDate = allPosts.sort(function (a, b) {
    return new Date(b.$createdAt) - new Date(a.$createdAt);
  });
  return (
    <div className="flex flex-col items-center w-full">
      {tweetsSortedByCreatedDate.map((posts, index) => (
        <div key={index} className="w-full">
          <SinglePost singlePost={posts} onLikeClick={likePost} />
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
