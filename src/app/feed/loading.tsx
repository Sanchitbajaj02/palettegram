export default async function Loading() {
  return (
    <>
      <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-8 content-center px-2">
        <section className="flex-1 sticky flex sm:flex-col items-center gap-8">
          <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-black/10 animate-pulse" />
          <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/20 animate-pulse" />
        </section>
        <section className="flex-[5] mt-4 sm:mt-0">
          <div className="w-full h-60 mb-4 rounded-lg dark:bg-white/10 bg-black/10 animate-pulse" />

          {new Array(5).fill(0).map((_, index) => {
            return (
              <div key={index} className="shadow dark:shadow-gray-600 mb-4 rounded-md">
                <div className="flex animate-pulse p-3">
                  <div className="flex-shrink-0 my-2">
                    <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700" />
                  </div>

                  <div className="ms-4 w-full my-2">
                    <h3 className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[40%]"></h3>

                    <ul className="mt-5 space-y-3">
                      <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
                      <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
                      <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <section className="flex-[2] hidden md:block">
          <div className="h-9 w-40 dark:bg-white/10 bg-black/10 rounded-lg ml-4 animate-pulse"></div>
          <div className="h-96 w-56 dark:bg-white/10 bg-black/10 rounded-lg ml-4 mt-4 animate-pulse"></div>
        </section>
      </main>
    </>
  );
}
