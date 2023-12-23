import Link from "next/link";
import Image from "next/image";
import { trendingPosts } from "@/backend/trendingPosts.dummy";

export default function TrendingFeed() {
  return (
    <section className="w-full px-4">
      <h3 className="text-left text-xl font-semibold mb-4">Trending Posts</h3>
      <div className="mb-4 max-h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary-light scrollbar-track-rounded-full">
        {trendingPosts.length &&
          trendingPosts.map((element: any, index: number) => {
            return (
              <Link
                href="#"
                className="block max-w-md shadow border-b border-gray-600 mb-3 p-2"
                key={index}
              >
                <div className="flex flex-row gap-3 items-center mb-2">
                  <Image src="/assets/user.png" alt="user" width={36} height={36} />
                  <p className="text-black dark:text-white font-medium text-md">
                    {element.username}
                  </p>
                </div>

                <p className="mb-2">{element.caption}</p>

                <p className="text-secondary-light dark:text-primary-light">read more ...</p>
              </Link>
            );
          })}
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <Link href="/" className="text-xs text-slate-500 hover:text-primary-light">
          About
        </Link>
        <Link href="/" className="text-xs text-slate-500 hover:text-primary-light">
          Accessibility
        </Link>
        <Link href="/" className="text-xs text-slate-500 hover:text-primary-light">
          Help Center
        </Link>
        <Link href="/" className="text-xs text-slate-500 hover:text-primary-light">
          Privacy & Terms
        </Link>
      </div>
    </section>
  );
}
