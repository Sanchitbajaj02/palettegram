"use client";
import { useEffect, useState } from "react";
import { Briefcase, Link2, Mail, MapPin, Smile, ArrowLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { UserFromDB } from "@/types";
import { getSingleUser } from "@/backend/auth.api";

import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";
import UserPosts from "./userPosts";
import { ButtonLong } from "@/components/core/buttons";

export default function User({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserFromDB>();

  const router = useRouter();

  useEffect(() => {
    getSingleUser(userId)
      .then((resp: any) => {
        setUser(resp);
      })
      .catch(console.log);
  }, [userId]);

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
              src="/assets/pinkCover.jpg"
              alt="user"
              fill
              className="object-center object-cover rounded-md"
            />
          </div>
          <section className="-mt-20 px-3">
            <div className="flex justify-between items-end ">
              <Image
                src="/assets/user.png"
                alt="user"
                width={125}
                height={125}
                className=" border-4 border-white dark:border-slate-800 rounded-full object-contain "
              />
              <div className="h-fit flex gap-4">
                <Mail className="h-7 w-7 sm:h-9 sm:w-9  border-2 p-1 rounded-full text-neutral-700 dark:text-neutral-400 border-neutral-700 dark:border-neutral-400" />
                <ButtonLong href="#" size="normal">
                  follow
                </ButtonLong>
              </div>
            </div>
            <div className="">
              <div className="py-2">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                  {user && user?.documents[0]?.fullName}
                </h1>
                <h1 className="text-sm text-neutral-900 dark:text-neutral-200">
                  {user && user?.documents[0]?.email}
                </h1>
              </div>

              <p className="">Software-developer | Python | MERN | Next-Tailwind | Opensource</p>

              <div className="space-y-3 text-sm text-neutral-300 pt-4">
                <aside className="flex items-center gap-1">
                  <Briefcase size={12} />
                  <p>Software Engineer at self</p>
                </aside>
                <aside className="flex items-center gap-1">
                  <MapPin size={12} />
                  <p>Hyderabad</p>
                </aside>
                <aside className="flex items-center gap-1">
                  <Link2 size={12} />
                  <Link href={"/#link"} className="hover:underline">
                    https://www.google.com
                  </Link>
                </aside>
                <aside className="flex items-center gap-1">
                  <Smile size={12} />
                  <p>Joined on {"8 jan 2012"}</p>
                </aside>
              </div>
            </div>
          </section>

          <div className="h-px w-full mt-6 bg-neutral-500 rounded-2xl" />

          <UserPosts userName={user! && user?.documents[0]?.fullName!} userId={userId} />
        </section>
        <div className="flex-[2] hidden md:block rounded-md">
          <TrendingFeed />
        </div>
      </main>
      <Footer />
    </>
  );
}
