import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../DB/api";
import { useDispatch } from "react-redux";
import { saveUser } from "../../Redux/auth/authReducer";

// function checkUsername(username) {
//   const test =
//     /^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g;

//   return username.match(test);
// }
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState("initial");

  function changeHandler(event) {
    const { name, value } = event.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  useEffect(() => {
    if (loginStatus === "success") {
      toast.success("Login Successful", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/feed");
      }, 3500);
    }
  }, [loginStatus, navigate]);

  function submitHander(event) {
    event.preventDefault();
    setLoginStatus("logging");
    if (data.email !== "" && data.password !== "") {
      loginUser(data)
        .then((res) => {
          if (res.email === data.email) {
            localStorage.setItem("userId", res["$id"]);
            localStorage.setItem("email", res.email);
            localStorage.setItem("fullName", res.name);
            localStorage.setItem("createdAt", res["$createdAt"]);

            dispatch(
              saveUser({
                userId: res["$id"],
                email: res.email,
                fullName: res.name,
                createdAt: res["$createdAt"],
              }),
            );
            setLoginStatus("success");
          }
        })
        .catch((err) => {
          console.log(err.message);
          setLoginStatus("failure");
        });
    }
  }

  return (
    <>
      <ToastContainer limit={1} />

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

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 text-xl rounded-full text-white bg-[#F1396D] transition duration-300 ease hover:bg-[#1C223A]"
                  disabled={
                    loginStatus === "success" || loginStatus === "logging"
                  }
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
