"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { ArrowLeftCircle, Loader } from "react-feather";
import { useRouter } from "next/navigation";

// Components
import { saveUser } from "@/redux/reducers/authReducer";
import { toastify } from "@/helper/toastify";

// API
import { registerUser } from "@/backend/auth.api";

// Icons
import { Eye, EyeOff } from "react-feather";

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "",
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
      setIsLoading(true);
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
      setIsLoading(false);
      toastify("Register Successful. Please check your email to verify", "success");
    } catch (error: any) {
      console.log(error.message + "message");
      setIsLoading(false);
      console.log(error);
      setRegisterStatus("failure");

      if (error.message.includes("password")) {
        toastify(
          "Oops! Your password should be at least 8 characters and avoid commonly used choices.",
          "info",
        );
      }
      if (error.message.includes("not matching")) {
        toastify("Both the passwords are not matching", "info");
      }
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
              Register and be a part of the amazing community
            </p>
          </article>

          <form method="POST" onSubmit={submitHander}>
            <div className="mb-6">
              <label
                htmlFor="fullName"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
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
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

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
                htmlFor="confirmpassword"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                required={true}
                onChange={changeHandler}
                placeholder="Re-enter your password"
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-secondary-light dark:text-gray-50">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-secondary hover:dark:text-primary-light"
                >
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
                {isLoading ? (
                  <Loader size={24} className="mx-auto animate-spin" />
                ) : (
                  <p>Register Now</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
