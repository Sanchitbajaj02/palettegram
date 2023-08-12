import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../DB/auth.api";
import { saveUser } from "../../Redux/auth/authReducer";
import toastify from "../../lib/toastify";

// function checkUsername(username) {
//   const test =
//     /^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g;

//   return username.match(test);
// }
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function submitHander(event) {
    event.preventDefault();
    try {
      if (data.email !== "" && data.password !== "") {
        const userCredentials = await loginUser(data);

        if (userCredentials.email === data.email) {
          localStorage.setItem("userId", userCredentials["$id"]);
          localStorage.setItem("email", userCredentials.email);
          localStorage.setItem("fullName", userCredentials.name);
          localStorage.setItem("createdAt", userCredentials["$createdAt"]);

          dispatch(
            saveUser({
              userId: userCredentials["$id"],
              email: userCredentials.email,
              fullName: userCredentials.name,
              createdAt: userCredentials["$createdAt"],
            }),
          );
          // toast.success("Login Successful");
          toastify("Login Successful", "success");

          setTimeout(() => {
            navigate("/feed");
          }, 3500);
        }
      }
    } catch (error) {
      console.log(error.message);

      toastify(
        "Login failed! Please click on register to make account",
        "error",
      );
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
        <div className="bg-white w-full p-4 rounded-xl shadow-lg">
          <article>
            <h1 className="text-4xl text-center font-bold">
              Welcome to Palettegram
            </h1>
            <p className="text-xl text-center font-medium my-4">
              Login and start your journey
            </p>
          </article>

          <article>
            <form method="POST" onSubmit={submitHander}>
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
                  Do not have an account?{" "}
                  <Link to="/register" className="text-[#F1396D]">
                    Register
                  </Link>
                </p>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 text-xl rounded-full text-white bg-[#F1396D] transition duration-300 ease hover:bg-[#1C223A]"
                >
                  Login Now
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </>
  );
}
