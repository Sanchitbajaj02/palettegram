import { Heart, MessageCircle } from "react-feather";
import { useSelector } from "react-redux";

export default function UserPosts({ userId }: { userId: any }) {

  const userPosts = useSelector((store : any) => store.posts.posts).filter((post:any) => post.accountId === userId);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 gap-8">
        {userId &&
          userPosts?.map((post:any, index:number) => (
            <div className="p-4 rounded-md shadow dark:shadow-gray-600 z-10 w-full h-full" key={index}>
              <p className="mb-4">{post?.postTitle}</p>
              <div key={index} className="relative flex justify-between items-center">
                <p className="flex items-center gap-2 font-bold">
                  <Heart size={24} />
                  {post?.likes.length}
                </p>
                <p className="flex items-center gap-2 font-bold">
                  <MessageCircle size={24} />
                  {post?.comments?.length}
                </p>
              </div>
            </div>
          ))}
      </div>

      {(userId && userPosts?.length === 0) && (
        <p className="text-center text-xl font-medium">No Posts Yet</p>
      )}
    </div>
  );
}
