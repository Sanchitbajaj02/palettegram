import TrendingArray from "../Assets/trendingPosts.json";
export default function TrendingFeed() {
  return (
    <>
      <div className="flex flex-col sticky top-24  ">
        <div className="w-60 border rounded-2xl  shadow-2xl   ">
          <div className="text-center font-serif text-xl font-bold   bg-white drop-shadow-md rounded-t-2xl ">
            Trending
          </div>
          <div className="trendingposts text-center h-96 pl-4 pr-2 py-4 flex flex-col gap-4 overflow-y-scroll rounded-2xl scrollbar-thumb-transparent  scrollbar-track-transparent scrollbar-thin  scrollbar-thumb-rounded-2xl scroll-m-4">
            {TrendingArray.trendingPosts.map((element) => {
              return (
                <div
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow "
                  key={element.UserId}
                >
                  <a href="#">
                    <i className="fa fa-user mt-2 fa-2x "></i>
                  </a>
                  <div className="py-2">
                    <a href="#">
                      <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {element.UserId}
                      </h6>
                    </a>
                    <p className="mb-1">{element.caption}</p>
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
                    >
                      Go to Post
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-xs  ">
          <div className="flex gap-5 px-4 py-2 mt-4">
            <button> About</button>
            <button>Accessibility</button>
            <button>Help Center</button>
          </div>

          <div className="text-center pb-2">
            <button>Privacy & Terms</button>
          </div>
        </div>
      </div>
    </>
  );
}
