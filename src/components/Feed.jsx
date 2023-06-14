import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TrendingFeed from "./TrendingFeed";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User, Bookmark } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feed = () => {
  const location = useLocation();
  const registerDetails = useSelector((state) => state.authenticator);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location, "WHAT");
    if (location.state) {
      if (location.state.method) {
        toast.success("Login Successful", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          toastId: location.state.method,
        });
        navigate(location.pathname, {});
      }
    }
  }, []);
  useEffect(() => {
    if (registerDetails && !registerDetails?.email) {
      navigate("/register");
    }

    return () => {
      console.log("cleaner");
    };
  }, [registerDetails, navigate]);

  return (
    <main className="flex max-w-screen-lg mx-auto pt-8 content-center">
      <ToastContainer limit={1} />

      <div className="flex-[1] h-80 sticky top-24 flex flex-col items-end">
        <Link
          to="/feed"
          className="w-12 h-12 rounded-full border hover:bg-black hover:text-white flex items-center justify-center m-8 mt-0 shadow-md transition duration-300"
        >
          <User />
        </Link>
        <Link
          to="/feed"
          className="w-12 h-12 rounded-full border hover:bg-black hover:text-white flex items-center justify-center m-8 mt-0 shadow-md transition duration-300"
        >
          <Bookmark />
        </Link>
      </div>
      <div className="flex flex-[3] gap-2">
        <div className="flex-1 flex flex-col ">
          <CreatePost />
          <Posts />
        </div>
      </div>
      <div className="flex-[2] hidden md:block">
        <TrendingFeed />
      </div>
    </main>
  );
};
export default Feed;
