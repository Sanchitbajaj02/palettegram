import logo from "../logo.svg";

const SingleProfilePage = () => {
  return (
    <main className="my-4 mx-8">
      <div className="flex gap-4">
        <div className="flex-[3] border">
          <div className="flex flex-col items-center">
            {/* Profile Info */}
            <div className="flex justify-between py-2 px-4 w-full">
              <p>FullName</p>
              <p>Bookmark</p>
            </div>
            {/* Image */}
            <img className="w-60 h-60 border m-4" src="" alt="post" />
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
        <div className="flex-[1]"></div>
      </div>
    </main>
  );
};
export default SingleProfilePage;
