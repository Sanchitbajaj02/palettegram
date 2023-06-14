/* eslint-disable quotes */
import { useRef, useState } from "react";
import { Command, Image } from "react-feather";
import { addNewImage, createPost } from "../DB/api";
import Colorpicker from "./Colorpicker";

// import logo from "../logo.svg";
const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postImages, setPostImages] = useState({
    image01: "",
    image02: "",
    image03: "",
    image04: "",
  });
  const inputRef = useRef(null);
  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    addNewImage(fileObj)
      .then((res) =>{
        setPostImages((prev) => {
          return { ...prev, image01: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res.$id}/view?project=64685bc4ecb8d4ee9f38&mode=admin` };
        });
        console.log(typeof postImages);
      })
      .catch(err => console.log(err));
  };


  const [togglePalette, setTogglePalette] = useState(false);

  const [colors, setcolors] = useState({
    color01: "",
    color02: "",
    color03: "",
    color04: "",
  });

  const onChangeInput = (event) => {
    const {
      target: { value },
    } = event;
    setPostTitle(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      userId: localStorage.getItem("userId"),
      postTitle: postTitle,
      colors: Object.values(colors),
      postImage: Object.values(postImages),
    };
    console.log(postData);
    createPost(postData)
      .then((res) => {
        if (res) {
          setPostTitle("");
          // window.location.reload(false);
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
          ></textarea>

          {togglePalette ? <Colorpicker setcolors={setcolors} /> : null}
        </div>
      </div>
      {postImages?.image01?.length > 0 ? (
        <img className="w-full" src={postImages?.image01} alt="hi"/>
      ) : null}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex items-center gap-3 group ">
            <input
              style={{display: "none"}}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <span className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center" onClick={handleClick}>
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
