import Link from "next/link";
import Image from "next/image";
import { trendingPosts } from "@/backend/trendingPosts.dummy";
import { motion } from "framer-motion";

export default function TrendingFeed() {
  return (
    <section className="lg:w-64 fixed px-4">
      <h3 className="text-left text-xl font-semibold mb-4 tracking-wide">Trending Posts</h3>
      <div className="mb-4 max-h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary-light scrollbar-track-rounded-full">
        {trendingPosts.length &&
          trendingPosts.map((element: any, index: number) => {
            return (
              <Link
                href="#"
                className="block max-w-md shadow border-b border-gray-600 mb-3 p-2"
                key={index}
              >
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 110,
                    delay: (index % 4) * 0.3 + 0.5,
                  }}
                  className="flex flex-row gap-3 items-center mb-2"
                >
                  <Image src="/assets/user.png" alt="user" width={36} height={36} />
                  <p className="text-black dark:text-white font-normal text-base">
                    {element.username}
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 110,
                    delay: (index % 4) * 0.4 + 0.6,
                  }}
                  className="mb-2"
                >
                  {element.caption}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 110,
                    delay: (index % 4) * 0.6 + 0.8,
                  }}
                  className="text-sm text-secondary-light dark:text-primary-light"
                >
                  Read more...
                </motion.p>
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
        <Link href="/contact" className="text-xs text-slate-500 hover:text-primary-light">
          Help Center
        </Link>
        <Link href="/" className="text-xs text-slate-500 hover:text-primary-light">
          Privacy & Terms
        </Link>
      </div>
    </section>
  );
}
