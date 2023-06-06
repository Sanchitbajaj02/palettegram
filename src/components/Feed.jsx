import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TrendingFeed from "./TrendingFeed";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Feed = () => {
  const registerDetails = useSelector((state) => state.register);
  const navigate = useNavigate();

  useEffect(() => {
    if (!registerDetails.fullName || !registerDetails.email) {
      navigate("/register");
    }
  }, [registerDetails, navigate]);

  return (
    <main className="flex max-w-screen-lg mx-auto pt-8 content-center">
      <div className="flex-[1] h-80 sticky top-24 flex flex-col items-end">
        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center m-8 mt-0">
          <i className="fa fa-user fa-2x"></i>
        </div>
        <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center m-8 mt-0">
          <i className="fa fa-bookmark fa-2x "></i>
        </div>
      </div>
      <div className="flex flex-[3] gap-2">
        <div className="flex-1 flex flex-col border border-blue-600  overflow-y-scroll ">
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
