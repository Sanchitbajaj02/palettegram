import React from "react";
import { Command, Image } from "react-feather";
import { createPost } from "../DB/api";

// import logo from "../logo.svg";
const CreatePost = () => {
  const [tweetForm, setTweetForm] = React.useState({
    text: "",
    colors: 0,
  });
  const onChangeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    setTweetForm((currTweetForm) => ({ ...currTweetForm, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      userId: localStorage.getItem("userId"),
      createdAt: new Date().toLocaleString(),
      postTitle: tweetForm.text,
    };
    createPost(postData)
      .then((res) => {
        if (res) {
          setTweetForm({ text: "" });
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-2 shadow-lg mb-4">
      <div className="flex">
        <div className="flex-1 ">
          <small className="text-slate-400">Character limit is upto 1000</small>
          <textarea
            onChange={onChangeInput}
            value={tweetForm.text}
            name="text"
            className=" bg-transparent outline-none border focus:ring rounded-lg p-3 text-black placholder:text-gray-400 font-medium text-lg w-full mb-2"
            rows="3"
            cols="50"
            placeholder="What's happening?"
            maxLength={1000}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex items-center gap-3 group text-blue-500">
            <a
              href="/"
              className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center"
            >
              <Image />
            </a>
          </div>

          <div className="flex items-center gap-3 group text-blue-500">
            <a
              href="/"
              className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center"
            >
              <Command />
            </a>
          </div>
        </div>

        <div className="">
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full"
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};
export default CreatePost;
