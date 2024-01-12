export default async function Loading() {
  return (
    <>
      <main className="flex max-w-screen-lg mx-auto content-center pt-24">
        <div className="flex-1 sticky flex flex-col gap-8">
          <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-black/10 animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/20 animate-pulse"></div>
        </div>
        <div className="flex-[5]">
          <div className="w-full h-60 rounded-lg dark:bg-white/10 bg-black/10 animate-pulse"></div>
        </div>
        <div className="flex-[2] hidden md:block">
          <div className="h-9 w-40 dark:bg-white/10 bg-black/10 rounded-lg ml-4 animate-pulse"></div>
          <div className="h-40 w-56 dark:bg-white/10 bg-black/10 rounded-lg ml-4 mt-4 animate-pulse"></div>
          <div className="h-40 w-56 dark:bg-white/10 bg-black/10 rounded-lg ml-4 mt-3 animate-pulse"></div>
        </div>
      </main>
    </>
  );
}
