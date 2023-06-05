import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../DB/api";

// function checkUsername(username) {
//   const test =
//     /^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/g;

//   return username.match(test);
// }

export default function Login() {
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

  function submitHander(event) {
    event.preventDefault();

    console.log(data);

    if (data.email !== "" && data.password !== "") {
      loginUser(data)
        .then((res) => {
          if (res["providerUid"] === data.email) {
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("email", res.providerUid);
            localStorage.setItem("expiry", res.expire);

            navigate("/feed");
          }
        })
        .catch((err) => console.log(err.message));
    }
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

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-2 text-xl rounded-full text-white bg-[#F1396D] transition duration-300 ease hover:bg-[#1C223A]"
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
