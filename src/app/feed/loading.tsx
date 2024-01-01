export default async function Loading() {
  return (
    <>
      <div className="h-16 w-full"></div>
      <main className="flex max-w-screen-lg mx-auto pt-8 content-center">
        <div className="flex-1 sticky flex flex-col items-center gap-8">
          <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-black/20 animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/20 animate-pulse"></div>
        </div>
        <div className="flex-[5]">
          <div className="w-full h-60 rounded-lg bg-white/10 animate-pulse"></div>
        </div>
        <div className="flex-[2] hidden md:block">
          <div className="h-9 w-40 bg-white/10 rounded-lg ml-4 animate-pulse"></div>
          <div className="h-40 w-56 bg-white/10 rounded-lg ml-4 mt-4 animate-pulse"></div>
          <div className="h-40 w-56 bg-white/10 rounded-lg ml-4 mt-3 animate-pulse"></div>
        </div>
      </main>
    </>
  );
}