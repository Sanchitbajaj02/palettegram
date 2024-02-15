/* eslint-disable quotes */
import { useCallback, useEffect, useRef, useState } from "react";
import { Command, Image as NewImageFeather } from "react-feather";
import { addNewImage, savePostToDb, getImageUrl } from "@/backend/posts.api";
import Colorpicker from "@/components/core/colorPicker";
import Image from "next/image";
import { parseCookies } from "nookies";
import { toastify } from "@/helper/toastify";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "@/redux/reducers/postsReducer";
import { PostInstanceType } from "@/types/index.d";
import isCtrlEnter from "@/helper/isCtrlEnter";
import Markdown from "@/components/Editor/Markdown";

const CHAR_LIMIT = 500;

const CreatePost = () => {
  const postSelector = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();
  const submitRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  // State to manage text field
  const [editorState, setEditorState] = useState("");

  // const [postTitle, setPostTitle] = useState("");

  // store image data
  const [imageStorage, setimageStorage] = useState<any>({
    preview: null,
    file: null,
  });

  // color palette toggle switch
  const [togglePalette, setTogglePalette] = useState(false);
  // To check Paletted touched or not
  const [isPaletteTouched, setPaletteTouched] = useState(false);

  // colors grid
  const [colors, setColors] = useState({
    color01: "#a5a2a2",
    color02: "#c2c2c2",
    color03: "#9c9c9c",
    color04: "#666665",
  });

  // get cookies from the browser
  const cookies = parseCookies();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      let imageURL: string = "";
      if (imageStorage && imageStorage.file) {
        const getFileObject = await addNewImage(imageStorage.file);

        if (!getFileObject) {
          throw new Error();
        }

        imageURL = getImageUrl(getFileObject["$id"])!;
      }

      const userIdFromCookies: string = cookies["accountId"];
      const imageArray = [imageURL];
      //console.log(imageArray);

      const finalDataToUpload: PostInstanceType = {
        accountId: userIdFromCookies,
        postTitle: editorState,
        postImages: imageArray.length > 0 ? imageArray : [],
        colors: (togglePalette && isPaletteTouched && JSON.stringify({ ...colors })) || null,
        isActive: true,
        comments: [],
        likes: [],
      };

      const savetoDb = await savePostToDb(finalDataToUpload);

      if (!savetoDb) {
        throw new Error();
      }
      // console.log(savetoDb);
      dispatch(addPost(finalDataToUpload));
      toastify("Post uploaded successfully", "success");

      // setPostTitle("");
      setEditorState("");
      setimageStorage({
        preview: null,
        file: null,
      });
      if (togglePalette) {
        colorPaletteSwitch();
      }

      // state resetters
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * @work handles the file and convert it into base64 string
   * @param event
   */
  const handleFileUpload = async (event: any) => {
    const reader = new FileReader();
    const fileObj = event.target.files[0];
    reader.readAsDataURL(fileObj);

    if (fileObj.size > 1000000) {
      toastify("Image size should be less than 1MB", "error");
      return;
    } else {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setimageStorage((prev: any) => {
            return {
              ...prev,
              preview: reader?.result,
              file: event.target.files[0],
            };
          });
        }
      };
    }
  };

  const colorPaletteSwitch = () => {
    if (togglePalette) {
      setTogglePalette(false);
      setColors({
        color01: "",
        color02: "",
        color03: "",
        color04: "",
      });
    } else {
      setTogglePalette(true);
    }
  };

  // const handleKeyPress = useCallback((event: KeyboardEvent) => {
  //   if (event.ctrlKey && event.key === "Enter") {
  //     submitRef.current.click();
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  return (
    <>
      <section className="border border-gray-500 rounded-md shadow-sm mb-4 p-2">
        <small className="text-slate-400 p-1">
          You have {CHAR_LIMIT - editorState.replaceAll(/<[^>]*>/g, "").length} characters left
        </small>

        <form className="p-4" method="post" onSubmit={handleSubmit}>
          <div
            tabIndex={0}
            className=""
            onKeyDown={(e) => {
              isCtrlEnter(e) ? handleSubmit(e) : null;
            }}
          >
            <Markdown editorState={editorState} setEditorState={setEditorState} />
          </div>
          {togglePalette ? (
            <Colorpicker
              colors={colors}
              setColors={setColors}
              setTouched={setPaletteTouched}
              isPalleteTouched={isPaletteTouched}
            />
          ) : (
            <article>
              {imageStorage && imageStorage.preview && (
                <Image
                  src={imageStorage.preview}
                  alt="user image"
                  loading="lazy"
                  width={600}
                  height={200}
                />
              )}
            </article>
          )}
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-row gap-2">
              <input
                style={{ display: "none" }}
                type="file"
                id="uploadImage"
                accept="image/jpg, image/png, image/jpeg, image/svg"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="uploadImage"
                className="transition-all duration-300 p-2 hover:bg-secondary-light hover:text-white rounded-full hover:cursor-pointer"
              >
                <NewImageFeather size={22} />
              </label>

              <button
                onClick={colorPaletteSwitch}
                type="button"
                className="transition-all duration-300 p-2 hover:bg-secondary-light hover:text-white rounded-full"
              >
                <Command size={22} />
              </button>
            </article>

            <article>
              <button
                ref={submitRef}
                type="submit"
                className="transition-all duration-300 bg-primary hover:bg-primary-light text-white font-normal py-1 px-8 rounded-full"
              >
                {postSelector.loading ? "Load" : "Post"}
              </button>
            </article>
          </div>
        </form>
      </section>
    </>
  );
};
export default CreatePost;
