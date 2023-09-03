/* eslint-disable quotes */
import { useRef, useState } from "react";
import { Command, Image as NewImageFeather } from "react-feather";
import { addNewImage, createPost, deleteImage } from "@/backend/posts.api";
import Colorpicker from "@/components/core/colorPicker";
import Image from "next/image";

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

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    addNewImage(fileObj)
      .then((res) => {
        console.log(res);
        setPostImages((prev) => {
          return {
            ...prev,
            image01: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res?.$id}/view?project=64685bc4ecb8d4ee9f38&mode=admin`,
          };
        });
        console.log(typeof postImages);
      })
      .catch((err) => console.log(err));
  };

  const handleClickDelete = (id: string) => {
    deleteImage(id)
      .then((res) => {
        setPostImages((prev) => {
          return {
            ...prev,
            image01: "",
            image02: "",
            image03: "",
            image04: "",
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const [togglePalette, setTogglePalette] = useState(false);

  const [colors, setColors] = useState({
    color01: null,
    color02: null,
    color03: null,
    color04: null,
  });

  const onChangeInput = (event: any) => {
    const {
      target: { value },
    } = event;
    setPostTitle(value);
  };

  const handleSubmit = async (event: any) => {
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
      postImage: Object.values(postImages),
    };

    createPost(postData)
      .then((res) => {
        if (res) {
          setPostTitle("");
          setColors((prev: any) => {
            return {
              ...prev,
              color01: "",
              color02: "",
              color03: "",
              color04: "",
            };
          });
          setPostImages((prev) => {
            return {
              ...prev,
              image01: "",
              image02: "",
              image03: "",
              image04: "",
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="border shadow-sm mb-8">
        <form className="p-4" method="post">
          <div className="mb-2">
            <small className="text-slate-400">Character limit is upto 1000</small>
            <textarea
              onChange={onChangeInput}
              value={postTitle}
              name="postTitle"
              className="dark:bg-secondary-light outline-none border focus:ring rounded-lg p-3 text-black dark:text-white placholder:text-gray-400 text-lg w-full mb-2"
              rows={3}
              cols={50}
              placeholder="What's happening?"
              maxLength={1000}
              required
            />

            {togglePalette ? <Colorpicker colors={colors} setColors={setColors} /> : null}
          </div>

          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-row gap-2">
              <input
                style={{ display: "none" }}
                type="file"
                id="uploadImage"
                accept="image/jpg, image/png, image/jpeg"
              />
              <label
                htmlFor="uploadImage"
                className="transition-all duration-300 p-2 hover:bg-secondary-light hover:text-white rounded-full hover:cursor-pointer"
              >
                <NewImageFeather size={22} />
              </label>

              <button
                onClick={() => setTogglePalette(!togglePalette)}
                className="transition-all duration-300 p-2 hover:bg-secondary-light hover:text-white rounded-full"
              >
                <Command size={22} />
              </button>
            </article>
            <article>
              <button
                type="submit"
                className="transition-all duration-300 bg-primary hover:bg-primary-light text-white font-normal py-1 px-8 rounded-full"
              >
                Post
              </button>
            </article>
          </div>
        </form>
      </section>
    </>
  );
};
export default CreatePost;

/*
<form onSubmit={handleSubmit} className="px-4 py-2 shadow-lg mb-4">
      <div className="flex">
        <div className="flex-1 ">
          <small className="text-slate-400">Character limit is upto 1000</small>
          <textarea
            onChange={onChangeInput}
            value={postTitle}
            name="postTitle"
            className="bg-transparent outline-none border focus:ring rounded-lg p-3 text-black placholder:text-gray-400 text-lg w-full mb-2"
            rows={3}
            cols={50}
            placeholder="What's happening?"
            maxLength={1000}
            required
          ></textarea>

          {togglePalette ? <Colorpicker colors={colors} setColors={setColors} /> : null}
        </div>
      </div>
      {postImages?.image01?.length > 0 ? (
        <Image
          className="w-full"
          src={postImages?.image01}
          alt="post"
          onClick={() => handleClickDelete(postImages?.image01.slice(72, 92))}
        />
      ) : null}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex items-center gap-3 group ">
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <span
              className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center"
              onClick={handleClick}
            >
              <NewImageFeather />
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
            className="primary hover:primary-light text-white font-bold py-2 px-8 rounded-full"
          >
            Post
          </button>
        </div>
      </div>
    </form>

*/
