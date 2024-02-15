import { ArrowLeftCircle } from "react-feather";
import React, { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { updateUserDetail } from "@/backend/updateProfile.api";
import { parseCookies } from "nookies";
import { toastify } from "@/helper/toastify";
import { Models } from "appwrite";
import { UserFromDB } from "@/types";

type propsType = {
  setProfileUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | undefined>>;
  user: Models.Document | UserFromDB | undefined;
};

export default function UpdateCard({ setProfileUpdate, setUser, user }: propsType) {
  const [userDetail, setUserDetail] = useState(user);
  const cookie = parseCookies();
  const currenUserId = cookie["accountId"];

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      let temp;
      const resp = await updateUserDetail(currenUserId, {
        fullName: userDetail?.fullName,
        about: userDetail?.about,
        profession: userDetail?.profession,
        location: userDetail?.location,
        userlink: userDetail?.userLink,
      });
      console.log(resp);
      if (!resp) throw new Error("Error in updating, retry!");
      toastify("Update Successfully", "success");
      setUser(resp);
      setProfileUpdate(false);
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
              size={20}
              onClick={() => setProfileUpdate(false)}
              className="hover:cursor-pointer text-secondary dark:text-white"
            />
            <h1 className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white">
              Update your profile
            </h1>
          </article>

          <div>
            <div className="mb-6">
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
                value={userDetail?.fullName}
                required={true}
                onChange={changeHandler}
                placeholder="Enter your full name"
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="bio"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Bio
              </label>
              <input
                type="text"
                name="about"
                id="about"
                value={userDetail?.about}
                required={true}
                onChange={changeHandler}
                placeholder="Enter your Bio"
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

            <div className="mb-6">
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
                  value={userDetail?.profession}
                  required={true}
                  onChange={changeHandler}
                  placeholder="Enter your Profession"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
              </div>
            </div>

            <div className="mb-6">
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
                  value={userDetail?.location}
                  required={true}
                  onChange={changeHandler}
                  placeholder="Enter Location"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="link"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Connection Link
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="userlink"
                  id="userlink"
                  required={true}
                  value={userDetail?.userLink}
                  onChange={changeHandler}
                  placeholder="Enter Some links"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="button"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
                onClick={handleSubmit}
                // disabled={registerStatus === "success" || registerStatus === "registering"}
              >
                {/* {isLoading ? (
                  <Loader size={24} className="mx-auto animate-spin" />
                ) : (
                  <p>Register Now</p>
                )} */}
                <p>Update Now</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
