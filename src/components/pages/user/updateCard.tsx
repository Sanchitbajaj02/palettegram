import { ArrowLeftCircle, Loader } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { updateUserDetail } from "@/backend/updateProfile.api";
import { parseCookies } from "nookies";
import { toastify } from "@/helper/toastify";
import { Models } from "appwrite";
import { UserFromDB } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { saveUserToStore } from "@/redux/reducers/authReducer";

type propsType = {
  setProfileUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | undefined>>;
  user: Models.Document | UserFromDB | undefined;
};

export default function UpdateCard({
  setProfileUpdate,
}: {
  setProfileUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatcher = useDispatch();
  const userDataFromStore = useSelector((state: any) => state.auth.data);

  const cookie = parseCookies();
  const currenUserId = cookie["userId"];

  const [userDetail, setUserDetail] = useState<any>({
    fullName: userDataFromStore && userDataFromStore?.fullName ? userDataFromStore?.fullName : "",
    about: userDataFromStore && userDataFromStore?.about ? userDataFromStore?.about : "",
    profession:
      userDataFromStore && userDataFromStore?.profession ? userDataFromStore?.profession : "",
    location: userDataFromStore && userDataFromStore?.location ? userDataFromStore?.location : "",
    userLink: userDataFromStore && userDataFromStore?.userLink ? userDataFromStore?.userLink : "",
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("some use detail", userDetail);

      const resp = await updateUserDetail(currenUserId, {
        fullName: userDetail && userDetail?.fullName ? userDetail?.fullName : "",
        about: userDetail && userDetail?.about ? userDetail?.about : "",
        profession: userDetail && userDetail?.profession ? userDetail?.profession : "",
        location: userDetail && userDetail?.location ? userDetail?.location : "",
        userLink: userDetail && userDetail?.userLink ? userDetail?.userLink : "",
      });
      if (!resp) throw new Error("Error in updating, retry!");

      toastify("Update Successfully", "success");

      dispatcher(saveUserToStore(resp));

      setProfileUpdate(false);
    } catch (error: any) {
      console.warn(error);
      toastify(error.message, "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50  w-full backdrop-blur-lg bg-secondary-200  ">
      <section className="max-w-screen-sm mx-auto h-screen flex justify-center items-center ">
        <div className="card">
          <article className="mb-8">
            <ArrowLeftCircle
              size={20}
              onClick={() => setProfileUpdate(false)}
              className="hover:cursor-pointer text-secondary dark:text-white"
            />
            <h1 className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white">
              Update your profile
            </h1>
          </article>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                defaultValue={userDetail?.fullName}
                required={true}
                onChange={changeHandler}
                placeholder="Enter your full name"
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="about"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                A bit about yourself
              </label>
              <input
                type="text"
                name="about"
                id="about"
                defaultValue={userDetail?.about}
                onChange={changeHandler}
                placeholder="Enter your Bio"
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="profession"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Profession
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="profession"
                  id="profession"
                  defaultValue={userDetail?.profession}
                  onChange={changeHandler}
                  placeholder="Enter your Profession"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  id="location"
                  defaultValue={userDetail?.location}
                  onChange={changeHandler}
                  placeholder="Enter Location"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="userLink"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Website/Blog
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="userLink"
                  id="userLink"
                  defaultValue={userDetail?.userLink}
                  onChange={changeHandler}
                  placeholder="Enter Some links"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                role="button"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
              >
                {isLoading ? (
                  <Loader size={24} className="mx-auto animate-spin self-center" />
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
