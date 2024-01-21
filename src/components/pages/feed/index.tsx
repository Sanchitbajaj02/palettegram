"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { User, Bookmark } from "react-feather";
import { parseCookies } from "nookies";

import Loader from "@/app/loading";
import CreatePost from "@/components/core/createPost";
import Posts from "@/components/core/posts";
import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";
import { motion } from "framer-motion";
import { getCurrentUser } from "@/backend/auth.api";
import { useRouter } from "next/navigation";

const Feed = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    emailVerification: undefined
  });
  const cookies = parseCookies();
  const userIdFromCookies: string = cookies["accountId"];

  useEffect(() => {
    getCurrentUser()
      .then((resp: any) => {
        setUser(resp);
      })
      .catch(console.log);
  }, []);
  if(user.emailVerification === false){
    router.push('/verify')
  }

  return (
    <>
      <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-8 content-center px-4  ">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 0.3 }}
          className=" flex-1 sticky flex sm:flex-col items-center gap-8 sm:space-y-20 "
        >
          <Link
            href={`/user/${userIdFromCookies}`}
            className="w-12 h-12 sm:fixed rounded-full flex items-center justify-center shadow-md dark:shadow-gray-600 transition-all duration-300 text-black dark:text-white hover:text-primary-light border hover:border-primary-light"
          >
            <User size={20} />
          </Link>

          <Link
            href="/user/bookmarks"
            className="w-12 h-12 sm:fixed rounded-full flex items-center justify-center shadow-md dark:shadow-gray-600 transition-all duration-300 text-black dark:text-white hover:text-primary-light border hover:border-primary-light"
          >
            <Bookmark size={20} />
          </Link>
        </motion.div>
        <div className="flex-[5] mt-4 sm:mt-0">
          <CreatePost />
          <Suspense fallback={<Loader />}>
            <Posts />
          </Suspense>
        </div>
        <div className="flex-[2] hidden md:block">
          <TrendingFeed />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Feed;
