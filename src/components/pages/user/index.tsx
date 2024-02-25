"use client";
import { Briefcase, Link2, Mail, MapPin, Smile, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";
import UserPosts from "./userPosts";
import { ButtonLong } from "@/components/core/buttons";
import { useSelector } from "react-redux";
import { userCollectionDB } from "@/types/auth";

export default function User({ userId }: { userId: string }) {
  const router = useRouter();

  const userAuth: userCollectionDB = useSelector((state: any) => state.auth.data);

  return (
    <>
      <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-4 content-center  ">
        <section className="flex-[5] h-full mt-4 sm:mt-0 px-4">
          <div className="my-4 flex gap-2 items-center">
            <ArrowLeft
              size={20}
              onClick={() => {
                router.back();
              }}
              className="hover:cursor-pointer hover:text-primary-light transition-all duration-300"
            />
            <h1 className="text-black dark:text-white text-base font-semibold">Go Back</h1>
          </div>
          <div className="h-52 w-full relative -z-[1]">
            <Image
              src={
                userAuth && userAuth?.bannerURL
                  ? userAuth?.bannerURL!
                  : "https://placehold.co/1200x300"
              }
              alt="banner-img"
              fill
              className="object-center object-cover rounded-md"
            />
          </div>

          <section className="-mt-16 px-3">
            <div className="flex justify-between items-end ">
              <Image
                src={
                  userAuth && userAuth?.avatarURL
                    ? userAuth?.avatarURL!
                    : "https://placehold.co/100x100"
                }
                alt="userAuth.data"
                width={125}
                height={125}
                className="border-4 border-white dark:border-slate-800 rounded-full object-contain "
              />

              <div className="h-fit flex gap-4">
                <Mail className="h-7 w-7 sm:h-9 sm:w-9 border-2 p-1 rounded-full text-slate-700 dark:text-slate-400 border-slate-700 dark:border-slate-400" />
                <ButtonLong href="#" size="normal">
                  Follow
                </ButtonLong>
              </div>
            </div>

            <article className="mt-2 space-y-4">
              <div className="space-y-1">
                <h1 className="text-xl font-semibold text-black dark:text-white">
                  {userAuth && userAuth?.fullName}{" "}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{userAuth && userAuth?.username}
                </p>
              </div>

              <p className="text-base">
                {userAuth?.about ? userAuth?.about : "Professional palettegram user"}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                <aside className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <p className="text-sm">Software Engineer at self</p>
                </aside>
                <aside className="flex items-center gap-2">
                  <MapPin size={16} />
                  <p className="text-sm">
                    {userAuth && userAuth.location ? userAuth.location : "Work from home"}
                  </p>
                </aside>
                <aside className="flex items-center gap-2">
                  <Link2 size={16} />
                  <Link href={"/#link"} className="hover:underline text-sm">
                    {userAuth?.userLink ? userAuth.userLink : "https://www.google.com"}
                  </Link>
                </aside>
                <aside className="flex items-center gap-2">
                  <Smile size={16} />
                  <p className="text-sm">
                    Joined on{" "}
                    {userAuth && userAuth.$createdAt
                      ? new Date(userAuth.$createdAt).toDateString()
                      : new Date().toDateString()}
                  </p>
                </aside>
              </div>
            </article>
          </section>

          <div className="h-px w-full mt-6 bg-neutral-500 rounded-2xl" />

          {userAuth && <UserPosts userId={userId} />}
        </section>
        <div className="flex-[2] hidden md:block rounded-md">
          <TrendingFeed />
        </div>
      </main>
      <Footer />
    </>
  );
}
