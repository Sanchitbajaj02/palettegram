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
            <>
              <div className="p-4 bg-gray-100 z-10 w-full h-full">
                <p className="mb-4">{photo?.postTitle}</p>
                <div
                  key={index}
                  className="relative flex justify-between items-center"
                >
                  <p className="flex items-center gap-2 font-bold">
                    <Heart size={24} />
                    {photo?.likes.length}
                  </p>
                  <p className="flex items-center gap-2 font-bold">
                    <MessageCircle size={24} />
                    {photo?.comments?.length}
                  </p>
                </div>
              </div>
            </>
          ))}
      </div>

      {(!user || user.length === 0) && (
        <p className="text-center text-2xl">No Posts Yet</p>
      )}
    </div>
  );
};

export default UserPosts;
