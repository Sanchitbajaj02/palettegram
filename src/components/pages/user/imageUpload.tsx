import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeftCircle, Loader } from "lucide-react";
import { parseCookies } from "nookies";
import { toastify } from "@/helper/toastify";
import { saveImage, updateImageURL } from "@/backend/updateProfile.api";
import { getUserImageUrl } from "@/backend/updateProfile.api";
import { Models } from "appwrite";
import { userImageUploadSizeTypes } from "@/types";

type propsType = {
  imgSize: userImageUploadSizeTypes;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | undefined>>;
  user: Models.Document | undefined;
};

type imageType = {
  file: File | null;
  preview: string;
};

const MAX_FILE_SIZE: number = 1024;

export default function ImageUpload({ imgSize, setHovered, setUser, user }: propsType) {
  const [image, setImage] = useState<imageType>({
    file: null,
    preview: "",
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const cookie = parseCookies();
  const currenUserId = cookie["userId"];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file upload:", event.target.files);

    const fsize: number | null =
      event.target.files && Math.round(event.target.files[0].size / MAX_FILE_SIZE);
    if (fsize && fsize > MAX_FILE_SIZE) {
      toastify("Image size cannot be more that 1MB", "error");
      setImage({
        file: null,
        preview: "",
      });
      return;
    }

    if (event.target.files) {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (!image || image.file === null) {
        throw new Error("file corrupted or file not uploaded");
      }

      const fileObject = await saveImage(image?.file);

      if (!fileObject) {
        throw new Error("Failed to load image, retry!");
      }

      const imageUrl = getUserImageUrl(fileObject["$id"], fileObject["bucketId"]);

      if (!imageUrl) {
        throw new Error("Image url can't be generated properly");
      }

      const resp = await updateImageURL(currenUserId, imageUrl, imgSize?.isbannerImage);

      if (!resp) {
        toastify("Problem with uploading the image", "error");
        return;
      }
      setUser(resp);
      toastify("Image Uploaded sucessfully", "success");
      setHovered(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50  w-full backdrop-blur-lg bg-secondary-200  ">
      <section className="max-w-screen-sm mx-auto h-screen flex justify-center items-center ">
        <div className="card">
          <article className="mb-8">
            <ArrowLeftCircle
              size={22}
              onClick={() => setHovered(false)}
              className="hover:cursor-pointer text-secondary dark:text-white"
            />
            <h1 className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white">
              {imgSize?.title}
            </h1>
          </article>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Preview
              </label>
              {imgSize && imgSize?.isbannerImage ? (
                <div className="h-52 w-full relative ">
                  <Image
                    src={image?.file ? image?.preview! : imgSize?.intialImageUrl}
                    alt={imgSize.title}
                    className="object-center object-cover w-full h-48 rounded-md"
                    width={1200}
                    height={300}
                  />
                </div>
              ) : (
                <div className="h-32 w-full relative">
                  <Image
                    src={image?.file ? image?.preview! : imgSize?.intialImageUrl!}
                    alt="userProfile"
                    className="w-[135px] h-[135px] object-center object-cover mx-auto rounded-full -z-10 "
                    width={1200}
                    height={300}
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                aria-required="true"
                className=" block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Select Photo <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                name="image"
                accept="image/png,image/jpg,image/jpeg,image/svg"
                id="image"
                required={true}
                onChange={(event) => handleFileUpload(event)}
                className="w-full rounded-md bg-white py-2 px-4 mb-2 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
              >
                {isLoading ? (
                  <Loader size={24} className="mx-auto animate-spin self-center" />
                ) : (
                  <p>Upload</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
