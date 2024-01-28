"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { ArrowLeftCircle, Loader } from "react-feather";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// Components
import { saveUser } from "@/redux/reducers/authReducer";
import { toastify } from "@/helper/toastify";

// API
import { registerUser } from "@/backend/auth.api";

// Icons
import { Eye, EyeOff } from "react-feather";

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [registerStatus, setRegisterStatus] = useState("initial");

  const router = useRouter();
  const dispatch = useDispatch();

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

      const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@_])[A-Za-z\d@_]{6,16}$/;
      const nameRegex: RegExp = /^[A-Za-z][A-Za-z]{7,24}$/;
      //user name should contain minimum of 2 letters and maximum 25 letters.

      if (data.password !== data.confirmpassword) {
        throw new Error("Password and Confirm Password does not match");
      }

      if (data.password.length < 6 || data.password.length > 16) {
        throw new Error(
          "Your password should be in range of 6 to 16 characters and avoid commonly used choices.",
        );
      }

      if (!passwordRegex.test(data.password)) {
        throw new Error(
          "Oops!, Password must contain a character, a number and a special charcter",
        );
      }

      if (!nameRegex.test(data.fullName)) {
        throw new Error("Oops!, Name should contain only alphabets!");
      }
      if (data.fullName == " ") {
        throw new Error("Oops !User name is empty");
      }
      const resp = await registerUser(data);

      dispatch(
        saveUser({
          userId: resp["$id"],
          email: resp.email,
          fullName: resp.name,
          isVerified: resp.emailVerification,
          createdAt: resp["$createdAt"],
        }),
      );
      setRegisterStatus("success");
      setIsLoading(false);
      toastify("Register Successful. Please check your email to verify", "success");
      router.push("/verify");
    } catch (error: any) {
      setIsLoading(false);
      setRegisterStatus("failure");
      toastify(error.message, "info");
    }
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
              size={20}
              onClick={() => router.back()}
              className="hover:cursor-pointer text-secondary dark:text-white"
            />
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.5 }}
              className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white"
            >
              Welcome to Palettegram
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.7 }}
              className="text-base md:text-xl text-center font-normal text-secondary-light dark:text-gray-50"
            >
              Register and be a part of the amazing community
            </motion.p>
          </article>

          <form method="POST" onSubmit={submitHander}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.9 }}
              className="mb-6"
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 1.1 }}
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
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 1.3 }}
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
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size={20} color="black" />
                  ) : (
                    <EyeOff size={20} color="black" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 1.5 }}
              className="mb-6"
            >
              <label
                htmlFor="confirmpassword"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  id="confirmpassword"
                  required={true}
                  onChange={changeHandler}
                  placeholder="Re-enter your password"
                  className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={20} color="black" />
                  ) : (
                    <EyeOff size={20} color="black" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 1.7 }}
              className="mb-6"
            >
              <p className="text-sm text-secondary-light dark:text-gray-50">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-secondary hover:dark:text-primary-light"
                >
                  Login
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 1.9 }}
              className="mb-4"
            >
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
            </motion.div>
          </form>
        </div>
      </motion.section>
    </>
  );
}
