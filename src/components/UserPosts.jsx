/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Heart, MessageCircle } from "react-feather";

const UserPosts = ({ user }) => {
  console.log(user);
  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 gap-8">
        {user &&
          user?.map((photo, index) => (
            <div
              key={index}
              className="relative p-4 bg-gray-200 z-10 w-full flex justify-evenly items-center h-full"
            >
              <p className="flex items-center gap-2 font-bold">
                <Heart size={30} />
                {photo?.likes.length}
              </p>
              <p className="flex items-center gap-2 font-bold">
                <MessageCircle size={30} />
                {photo?.comments?.length}
              </p>
            </div>
          ))}
      </div>

      {(!user || user.length === 0) && (
        <p className="text-center text-2xl">No Posts Yet</p>
      )}
    </div>
  );
};

export default UserPosts;
