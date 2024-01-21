"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Loader, ArrowLeftCircle } from "react-feather";
import { motion } from "framer-motion";

// Components
import { saveUser } from "@/redux/reducers/authReducer";
import { toastify } from "@/helper/toastify";

// API
import { loginUser } from "@/backend/auth.api";
import { loginWithGoogle } from "@/backend/auth.api";

// Icons
import { Eye, EyeOff } from "react-feather";

export default function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setIsLoading(true);

      if (data.email !== "" && data.password !== "") {
        const userCredentials = await loginUser(data);

        if (userCredentials && userCredentials?.providerUid === data.email) {
          const localObject = {
            userId: userCredentials?.userId,
            email: userCredentials?.providerUid,
            createdAt: userCredentials.$createdAt,
          };

          dispatch(saveUser(localObject));
          setIsLoading(false);
          toastify("Login Successful", "success");

          router.push("/feed");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
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
      <motion.section
        initial={{ opacity: 0, y: -350 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.1, type: "spring", stiffness: 110 }}
        className="max-w-screen-sm mx-auto h-screen flex justify-center items-center"
      >
        <div className="card">
          <article className="mb-8">
            <ArrowLeftCircle
              size={22}
              onClick={() => router.back()}
              className="hover:cursor-pointer text-secondary dark:text-white"
            />
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 0.5 }}
              className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white"
            >
              Welcome to Palettegram
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 0.7 }}
              className="text-base md:text-xl text-center font-normal text-secondary-light dark:text-gray-50"
            >
              Login to connect with the amazing community
            </motion.p>
          </article>

          <form method="POST" onSubmit={submitHander}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 0.9 }}
              className="mb-6"
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 1.1 }}
              className="mb-6"
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 1.3 }}
              className="flex justify-between mb-4"
            >
              <p className="text-sm text-secondary-light dark:text-gray-50">
                Do not have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-secondary hover:dark:text-primary-light"
                >
                  Register
                </Link>
              </p>
              <p className="text-sm text-secondary-light dark:text-gray-50">
                <Link
                  href="/forgot"
                  className="text-primary underline hover:text-secondary hover:dark:text-primary-light"
                >
                  Forgot Password ?
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 1.5 }}
              className="mb-4"
            >
              <button
                type="submit"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
              >
                {isLoading ? (
                  <Loader size={24} className="mx-auto animate-spin self-center" />
                ) : (
                  <p>Login</p>
                )}
              </button>
            </motion.div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 1.5 }}
                className="flex flex-col justify-center items-center gap-2"
              >
                <p>OR</p>
                <button
                  className="px-4 py-2 flex flex-row text-sm md:text-base rounded border text-black bg-white transition duration-300 ease hover:bg-secondary hover:text-white items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    loginWithGoogle();
                  }}
                >
                  <span>Login with Google</span>
                </button>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.section>
    </>
  );
}
