"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { saveUser } from "@/redux/reducers/authReducer";
import { registerUser } from "@/backend/auth.api";
import { toastify } from "@/helper/toastify";
import { ArrowLeftCircle } from "react-feather";
import { useRouter } from "next/navigation";

export default function RegisterComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [registerStatus, setRegisterStatus] = useState("initial");

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function submitHander(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setRegisterStatus("registering");
      const resp = await registerUser(data);

      dispatch(
        saveUser({
          userId: resp["$id"],
          email: resp.email,
          fullName: resp.name,
          createdAt: resp["$createdAt"],
        }),
      );
      setRegisterStatus("success");
      toastify("Register Successful. Please check your email to verify", "success");
    } catch (error: any) {
      console.log(error);
      setRegisterStatus("failure");
      if (error.message.includes("password")) {
        toastify(
          "Oops! Your password should be at least 8 characters and avoid commonly used choices.",
          "info",
        );
      } else {
        toastify(error.message, "error");
      }
    }
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
            <h1 className="text-xl md:text-3xl mb-2 md:mb-4 text-center font-bold  dark:text-[#1c223a]">
              Welcome to Palettegram
            </h1>
            <p className="text-md md:text-xl text-center font-normal dark:text-[#424551]">
              Register and be a part of community
            </p>
          </article>

          <form method="POST" onSubmit={submitHander}>
            <div className="mb-6">
              <label
                htmlFor="fullName"
                aria-required="true"
                className="mb-3 block text-sm md:text-base font-medium dark:text-[#424551]"
              >
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required={true}
                onChange={changeHandler}
                placeholder="Enter your full name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                aria-required="true"
                className="mb-3 block text-sm md:text-base font-medium dark:text-[#424551]"
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
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                aria-required="true"
                className="mb-3 block text-sm md:text-base font-medium dark:text-[#424551]"
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
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6">
              <p className="block text-sm md:text-base font-medium dark:text-[#424551]">
                Already have an account?{" "}
                <Link href="/login" className="text-primary">
                  Login
                </Link>
              </p>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
                disabled={registerStatus === "success" || registerStatus === "registering"}
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
