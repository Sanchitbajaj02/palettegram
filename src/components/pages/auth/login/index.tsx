"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftCircle } from "react-feather";

// Components
import { saveUser } from "@/redux/reducers/authReducer";
import { toastify } from "@/helper/toastify";

// API
import { loginUser } from "@/backend/auth.api";

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

        if (userCredentials && userCredentials?.providerUid === data.email) {
          const localObject = {
            userId: userCredentials?.userId,
            email: userCredentials?.providerUid,
            createdAt: userCredentials.$createdAt,
          };

          dispatch(saveUser(localObject));
          toastify("Login Successful", "success");

          router.push("/feed");
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
              Login to connect with the amazing community
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

            <div className="mb-6">
              <label
                htmlFor="password"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
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
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
              />
            </div>

            <div className="mb-4">
              <p className="text-sm text-secondary-light dark:text-gray-50">
                Do not have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-secondary hover:dark:text-primary-light"
                >
                  Register
                </Link>
              </p>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
