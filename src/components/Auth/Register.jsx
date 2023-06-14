import { useState } from "react";
import { registerUser } from "../../DB/api";
import { useDispatch } from "react-redux";
import { saveUser } from "../../Redux/auth/authReducer";
import { Link } from "react-router-dom";

// function checkUsername(username) {
//   const test =
//     /^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g;

//   return username.match(test);
// }
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [registerStatus, setRegisterStatus] = useState("initial");

  function changeHandler(event) {
    const { name, value } = event.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function submitHander(event) {
    event.preventDefault();

    setRegisterStatus("registering");
    registerUser(data)
      .then((resp) => {
        localStorage.setItem("userId", resp["$id"]);
        localStorage.setItem("email", resp.email);
        localStorage.setItem("fullName", resp.name);
        localStorage.setItem("createdAt", resp["$createdAt"]);

        dispatch(
          saveUser({
            userId: resp["$id"],
            email: resp.email,
            fullName: resp.name,
            createdAt: resp["$createdAt"],
          }),
        );
        setRegisterStatus("success");
        toast.success("Register Successful");
      })
      .catch((err) => {
        console.log(err);
        setRegisterStatus("failure");
      });
  }

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex justify-center items-center">
        <div className="bg-white w-full p-4 rounded-xl shadow-lg">
          <article>
            <h1 className="text-4xl text-center font-bold">
              Welcome to Palettegram
            </h1>
            <p className="text-xl text-center font-medium my-4">
              Register and be a part of community
            </p>
          </article>

          <article>
            <form method="POST" onSubmit={submitHander}>
              <div className="mb-6">
                <label
                  htmlFor="fullName"
                  aria-required="true"
                  className="mb-3 block text-base font-medium"
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
                  className="mb-3 block text-base font-medium"
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
                  className="mb-3 block text-base font-medium"
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
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#F1396D]">
                    Login
                  </Link>
                </p>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 text-xl rounded-full text-white bg-[#F1396D] transition duration-300 ease hover:bg-[#1C223A]"
                  disabled={
                    registerStatus === "success" ||
                    registerStatus === "registering"
                  }
                >
                  Register Now
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </>
  );
}
