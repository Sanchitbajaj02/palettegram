import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TrendingFeed from "./TrendingFeed";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Feed = () => {
  const registerDetails = useSelector((state) => state.authenticator);
  const navigate = useNavigate();

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
      <div className="flex-[1] h-80 sticky top-24 flex flex-col items-end">
        <Link to="/feed">
          <div className="w-12 h-12 rounded-full border hover:bg-black hover:text-white flex items-center justify-center m-8 mt-0">
            <i className="fa fa-user fa-lg"></i>
          </div>
        </Link>
        <Link to="/feed">
          <div className="w-12 h-12 rounded-full border hover:bg-black hover:text-white flex items-center justify-center m-8 mt-0">
            <i className="fa fa-bookmark fa-lg scale-[0.9]"></i>
          </div>
        </Link>
      </div>
      <div className="flex flex-[3] gap-2">
        <div className="flex-1 flex flex-col border border-blue-600">
          <CreatePost />
          <Posts />
        </div>
      </div>
      <div className="flex-[2] hidden md:block ml-8">
        <TrendingFeed />
      </div>
    </main>
  );
};
export default Feed;
