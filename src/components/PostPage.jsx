import logo from "../logo.svg";
import meme1 from "../Assets//meme1.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PostPage = () => {
  const registerDetails = useSelector((state) => state.register);
  const navigate = useNavigate();

  useEffect(() => {
    if (!registerDetails.fullName || !registerDetails.email) {
      navigate("/register");
    }
  }, [registerDetails, navigate]);
  return (
    <main className="max-w-screen-lg mx-auto flex justify-center border">
      <div
        className="flex gap-4
    h-full p-4"
      >
        <div className="flex-[2] border h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden p-4">
          <div className="flex flex-col items-center">
            {/* Profile Info */}
            <div className="flex h-10 justify-between py-2 px-4 w-full">
              <p>FullName</p>
              <p>Bookmark</p>
            </div>
            {/* Image */}
            <img className="w-[90%] border m-4" src={meme1} alt="post" />
            {/* Post Info */}
            <div className="flex justify-evenly w-full my-2">
              <p>likes</p>
              <p>comments</p>
              <p>share</p>
              <p>download</p>
            </div>
          </div>
          <div>
            <div className="flex p-4 items-center border border-1 gap-2 justify-center">
              <img className="w-10 h-10" src={logo} alt="profile" />
              <input
                type="text"
                placeholder="Placeholder"
                className="p-3 placeholder-slate-300 text-slate-600 bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-full ring-[#F1396D]"
              />
              <div className="">Send</div>
            </div>
          </div>
        </div>
        <div className="flex-[1] border items-center flex-grow h-[20%] justify-evenly py-4 hidden md:flex">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
            <i className="fa fa-user fa-2x"></i>
          </div>
          <h4>Full Name</h4>
          <button
            className="w-20
          outline-none bg-blue-500
          rounded-md py-2 hover:ring"
          >
            Follow
          </button>
        </div>
      </div>
    </main>
  );
};
export default PostPage;
