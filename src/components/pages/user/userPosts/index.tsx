import { Heart, MessageCircle } from "react-feather";

export default function UserPosts({ user }: { user: any }) {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 gap-8">
        {user &&
          user?.map((photo: any, index: number) => (
            <div className="p-4 bg-gray-100 z-10 w-full h-full" key={index}>
              <p className="mb-4">{photo?.postTitle}</p>
              <div key={index} className="relative flex justify-between items-center">
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
          ))}
      </div>

      {(!user || user.length === 0) && (
        <p className="text-center text-xl font-medium">No Posts Yet</p>
      )}
    </div>
  );
}
