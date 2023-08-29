"use client";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "@/backend/auth.api";
import { saveUser } from "@/redux/reducers/authReducer";
import { toastify } from "@/helper/toastify";

import { ArrowLeftCircle } from "react-feather";
// function checkUsername(username) {
//   const test =
//     /^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g;

//   return username.match(test);
// }
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function LoginComponent() {
  const dispatch = useDispatch();
  const authSelector = useSelector((state: any) => state.auth);

  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function submitHander(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (data.email !== "" && data.password !== "") {
        const userCredentials = await loginUser(data);

        console.log(userCredentials);

        if (userCredentials && userCredentials?.providerUid === data.email) {
          localStorage.setItem("userId", userCredentials?.userId);
          localStorage.setItem("email", userCredentials?.providerUid);
          // localStorage.setItem("fullName", userCredentials?.name);
          localStorage.setItem("createdAt", userCredentials["$createdAt"]);

          dispatch(
            saveUser({
              userId: userCredentials?.userId,
              email: userCredentials?.providerUid,
              // fullName: userCredentials.name,
              createdAt: userCredentials["$createdAt"],
            }),
          );
          // toast.success("Login Successful");
          toastify("Login Successful", "success");

          setTimeout(() => {
            router.push("/feed");
          }, 3500);
        }
      }
    } catch (error: any) {
      console.log(error.message);

      toastify("Login failed! Please click on register to make account", "error");
    }
  }

  if (authSelector.loading) {
    return <h1>Loading...</h1>;
  }

  if (authSelector.error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex justify-center items-center">
        <div className="bg-gray-200/50 w-full p-4 mx-2 md:m-0 md:p-8 rounded-xl shadow-lg">
          <article className="mb-8">
            <ArrowLeftCircle
              size={20}
              color="#1c223a"
              onClick={() => router.back()}
              className="hover:cursor-pointer"
            />
            <h1 className="text-xl md:text-3xl mb-2 md:mb-4 text-center font-bold  text-secondary">
              Welcome to Palettegram
            </h1>
            <p className="text-md md:text-xl text-center font-normal dark:text-secondary-text">
              Login and start your journey
            </p>
          </article>

          <form method="POST" onSubmit={submitHander}>
            <div className="mb-6">
              <label
                htmlFor="email"
                aria-required="true"
                className="mb-3 block text-sm md:text-base font-medium dark:text-secondary-text"
              >
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required={true}
                onChange={changeHandler}
                placeholder="Enter your email address"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-sm md:text-base font-medium text-[#1c223a] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                aria-required="true"
                className="mb-3 block text-sm md:text-base font-medium dark:text-secondary-text"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required={true}
                onChange={changeHandler}
                placeholder="Enter your password"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-sm md:text-base font-medium text-[#1c223a] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6">
              <p className="dark:text-secondary-text">
                Do not have an account?{" "}
                <Link href="/register" className="text-primary">
                  Register
                </Link>
              </p>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
              >
                Login Now
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
