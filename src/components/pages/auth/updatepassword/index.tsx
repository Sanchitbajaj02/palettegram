"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeftCircle, Loader } from "react-feather";
import { useRouter, useSearchParams } from "next/navigation";

// Components
import { toastify } from "@/helper/toastify";

// API
import { updatepassword } from "@/backend/auth.api";

// Icons
import { Eye, EyeOff } from "react-feather";

export default function UpdatePasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    USER_ID: String(searchParams.get("userId")),
    SECRET: String(searchParams.get("secret")),
    password: "",
    confirmpassword: "",
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
      setIsLoading(true);
      setUpdatingStatus("updating");
      if (data.password === data.confirmpassword) {
        const resp = await updatepassword(data);
        router.push("/login");
        setUpdatingStatus("success");
        setIsLoading(false);
        toastify("Updated Successful.", "success");
      } else {
        throw new Error("Please recheck password and update again");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      setUpdatingStatus("failure");
      toastify("Request failed, Please recheck password and update again", "error");
    }
  }

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex justify-center items-center">
        <div className="card">
          <article className="mb-8">
            <ArrowLeftCircle
              size={20}
              onClick={() => router.back()}
              className="hover:cursor-pointer text-secondary dark:text-white"
            />
            <h1 className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white">
              Welcome to Palettegram
            </h1>
            <p className="text-base md:text-xl text-center font-normal text-secondary-light dark:text-gray-50">
              Update Your Password
            </p>
          </article>

          <form method="POST" onSubmit={submitHander}>
            <div className="mb-6">
              <label
                htmlFor="password"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required={true}
                  onChange={changeHandler}
                  placeholder="Enter your password"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
                <div>
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    onClick={(e) => {
                      setShowPassword(!showPassword);
                      e.preventDefault();
                    }}
                  >
                    <div className=" rounded">
                      {showPassword ? (
                        <Eye size={20} color="black" />
                      ) : (
                        <EyeOff size={20} color="black" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  required={true}
                  onChange={changeHandler}
                  placeholder="Enter your password"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
                <div></div>
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
                disabled={updatingStatus === "success" || updatingStatus === "updating"}
              >
                {isLoading ? (
                  <Loader size={24} className="mx-auto animate-spin" />
                ) : (
                  <p>Update Now</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
