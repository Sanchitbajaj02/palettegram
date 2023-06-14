import { useState } from "react";
import { Command, Image } from "react-feather";
import { createPost } from "../DB/api";
import Colorpicker from "./Colorpicker";

// import logo from "../logo.svg";
const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");

  const [togglePalette, setTogglePalette] = useState(false);

  const [colors, setColors] = useState({
    color01: null,
    color02: null,
    color03: null,
    color04: null,
  });

  const onChangeInput = (event) => {
    const {
      target: { value },
    } = event;
    setPostTitle(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(colors);

    const newColors =
      colors.color01 !== null &&
      colors.color02 !== null &&
      colors.color03 !== null &&
      colors.color04 !== null
        ? colors
        : [];

    const postData = {
      userId: localStorage.getItem("userId"),
      postTitle: postTitle,
      colors: Object.values(newColors),
    };

    createPost(postData)
      .then((res) => {
        if (res) {
          setPostTitle("");
          setColors({
            color01: "",
            color02: "",
            color03: "",
            color04: "",
          });
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
            value={postTitle}
            name="postTitle"
            className="bg-transparent outline-none border focus:ring rounded-lg p-3 text-black placholder:text-gray-400 text-lg w-full mb-2"
            rows="3"
            cols="50"
            placeholder="What's happening?"
            maxLength={1000}
            required
          ></textarea>

          {togglePalette ? (
            <Colorpicker colors={colors} setColors={setColors} />
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex items-center gap-3 group ">
            <span className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
              <Image />
            </span>
          </div>

          <div className="flex items-center gap-3 group ">
            <span
              onClick={() => setTogglePalette(!togglePalette)}
              className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center"
            >
              <Command />
            </span>
          </div>
        </div>

        <div className="">
          <button
            type="submit"
            className="bg-pg-pink hover:bg-pg-pink-light text-white font-bold py-2 px-8 rounded-full"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};
export default CreatePost;
