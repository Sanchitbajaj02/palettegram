import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TrendingFeed from "./TrendingFeed";
const Feed = () => {
  return (
    <main className="grid grid-flow-col max-w-screen-lg mx-auto pt-8 content-center  ">
      <div className="max-w-40 h-80 sticky top-24 flex flex-col items-end">
        {/* FIX USER AND BOOKMARK ICONS */}
        {/* <div className="rounded-[100px] shadow-lg h-32 w-32 bg-slate-100 mb-4 relative"> */}
        {/* <i className="fa-3x absolute "></i>
        </div>
        <div className="rounded-[50px] shadow-lg bg-slate-100  ">
          <i className="fa-2x"></i>
        </div> */}
        {/* <div className="flex flex-col items-center gap-4 ">
          <div className="rounded-full shadow-xl  ">
            <i className="fa fa-user "></i>
          </div>
          <div>
            <i className="fa fa-bookmark  "></i>
          </div>
        </div> */}
        <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center m-8">
          <i className="fa fa-user fa-2x"></i>
        </div>
        <div className="w-20 h-20 rounded-full bg-yellow-300 flex items-center justify-center m-8 mt-0">
          <i className="fa fa-bookmark fa-2x "></i>
        </div>
      </div>
      <div className="flex  gap-2">
        <div className=" flex-[3] border border-blue-600  overflow-y-scroll ">
          <CreatePost />
          <Posts />
        </div>
        <div className=" hidden sm:block ml-8">
          <TrendingFeed />
        </div>
      </div>
    </main>
  );
};
export default Feed;
