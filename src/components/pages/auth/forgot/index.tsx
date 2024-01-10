"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader, ArrowLeftCircle } from "react-feather";

// Components
import { toastify } from "@/helper/toastify";

// API
import { forgotpassword } from "@/backend/auth.api";

// Icons

export default function ForgotComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [email, setEmail] = useState("");

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function submitHander(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);

      if (email !== "") {
        const response = await forgotpassword(email);
        setIsLoading(false);
        toastify("Send Successful", "success");
        router.push("/login");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);

      toastify("failed! Please click on send again", "error");
    }
  }

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex justify-center items-center">
        <div className="card">
          <article className="mb-8">
            <ArrowLeftCircle
              size={22}
              onClick={() => router.back()}
              className="hover:cursor-pointer text-secondary dark:text-white"
            />
            <h1 className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white">
              Welcome to Palettegram
            </h1>
            <p className="text-base md:text-xl text-center font-normal text-secondary-light dark:text-gray-50">
              Forgot Password ?
            </p>
          </article>

          <form method="POST" onSubmit={submitHander}>
            <div className="mb-6">
              <label
                htmlFor="email"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
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
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
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
                  <p>Send</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
