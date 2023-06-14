// import logo from "../logo.svg";
import { useState } from "react";
import { getSinglePost } from "../DB/api";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { User } from "react-feather";
import {
  Download,
  Heart,
  MessageCircle,
  Share,
  ArrowLeftCircle,
} from "react-feather";

const PostProfilePage = () => {
  const registerDetails = useSelector((state) => state.authenticator);
  const navigate = useNavigate();

  const { id } = useParams();

  const [singlePostState, setSinglePostState] = useState({});

  const copyText = async (color) => {
    await navigator.clipboard.writeText(color);
  };

  useEffect(() => {
    if (!registerDetails?.email) {
      navigate("/register");
    } else {
      getSinglePost(id)
        .then((resp) => {
          setSinglePostState(resp);
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [registerDetails, navigate, id]);

  console.log(singlePostState);

  return (
    <main className="max-w-screen-lg mx-auto">
      <button className="mt-4 flex items-center" onClick={() => navigate(-1)}>
        <ArrowLeftCircle size={20} /> Back to feed
      </button>
      <div className="flex items-start gap-4 h-full p-8">
        <div className="flex-[2] h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden ">
          {/* Profile Info */}
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center shadow">
              <User size={18} />
            </div>
            <h4 className="text-xl font-medium">
              {registerDetails?.fullName ? registerDetails?.fullName : ""}
            </h4>
          </div>
          {/* Image */}

          <p className="text-lg my-4">
            {singlePostState?.postTitle ? singlePostState?.postTitle : ""}
          </p>

          {singlePostState && singlePostState?.postImage[0]?.length > 0 ? (
            <img
              className="w-full"
              src={singlePostState?.postImage[0]}
              alt={singlePostState?.postTitle}
            />
          ) : null}

          {singlePostState?.colors?.length > 0 ? (
            <div className="my-2 flex flex-row justify-between items-center w-full">
              {singlePostState?.colors?.map((color, index) => {
                return (
                  <div
                    key={index}
                    className="flex-grow h-52 cursor-pointer"
                    onClick={() => copyText(`#${color}`)}
                    style={{
                      backgroundColor: `#${color}`,
                    }}
                  ></div>
                );
              })}
            </div>
          ) : null}

          {/* Post Info */}
          <div className="flex justify-around">
            <div className="flex items-center gap-2 group text-blue-500">
              <div
                className={`p-2 rounded-full ${
                  singlePostState?.likes?.includes(registerDetails.userId)
                    ? "bg-blue-800 text-blue-300"
                    : "group-hover:bg-blue-800 group-hover:text-blue-300"
                } flex justify-center items-center`}
              >
                <Heart size={16} />
              </div>
              <span className="font-light">
                {singlePostState?.likes?.length}
              </span>
            </div>

            <div className="flex items-center gap-2 group text-blue-500">
              <div className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
                <MessageCircle size={16} />
              </div>
              <span className="font-light">
                {singlePostState?.comments?.length}
              </span>
            </div>
            <div className="flex items-center gap-2 group text-blue-500">
              <div className="p-2 rounded-full group-hover:bg-blue-800 group-hover:text-blue-300 flex justify-center items-center">
                <Share size={16} />
              </div>
              <span className="font-light">3213</span>
            </div>
            <div className="p-2 rounded-full flex justify-center items-center text-blue-500 hover:bg-blue-800 hover:text-blue-300">
              <Download size={16} />
            </div>
          </div>

          {/* <div className="flex p-4 items-center border border-1 gap-2 justify-center">
            <img className="w-10 h-10" src={logo} alt="profile" />
            <input
              type="text"
              placeholder="Placeholder"
              className="p-3 placeholder-slate-300 text-slate-600 bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-full ring-[#F1396D]"
            />
            <div className="">Send</div>
          </div> */}
        </div>

        <div className="flex-[1] items-center flex-grow justify-around py-4 hidden md:flex">
          <div className="rounded-full bg-red-500 p-4">
            <User />
          </div>
          <h4>{registerDetails?.fullName ? registerDetails?.fullName : ""}</h4>
          <button className="w-20 outline-none bg-blue-500 rounded-md py-2 hover:ring text-white">
            Follow
          </button>
        </div>
      </div>
    </main>
  );
};
export default PostProfilePage;
