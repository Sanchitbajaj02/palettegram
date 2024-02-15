"use client";
import { useEffect, useState } from "react";
import { Briefcase, Link2, Mail, MapPin, ArrowLeft, Edit, Edit3, Calendar } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

import { getSingleUser, getUserDetails } from "@/backend/auth.api";

import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";
import { ButtonLong } from "@/components/core/buttons";

import UserPosts from "./userPosts";
import ImageUpload from "./imageUpload";
import UpdateCard from "./updateCard";
import { Models } from "appwrite";

type sizeType = {
  isbannerImage: boolean;
  intialImageUrl: string;
  title: string;
};

export default function User({ accountId }: { accountId: string }) {
  const [user, setUser] = useState<Models.Document>();
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [size, setSize] = useState<sizeType>();

  const cookies = parseCookies();

  const currenUserID: string = cookies["accountId"];

  const getUserDetail = async (userId: string) => {
    try {
      const resp: any = await getSingleUser(userId);
      if (!resp) throw new Error("Enable to get user-details, retry!");
      setUser(resp.documents[0]);
      currenUserID === userId ? setEdit(true) : setEdit(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    /*  getSingleUser(accountId)
      .then((resp: any) => {
        setUser(resp);
      })
      .catch(console.log); */
    getUserDetail(accountId);
  }, [accountId]);

  const handlePhotoClick = ({ isbannerImage, title, intialImageUrl }: sizeType) => {
    setSize({
      isbannerImage: isbannerImage,
      intialImageUrl: intialImageUrl,
      title: title,
    });
    setHovered(true);
  };

  return (
    <>
      {profileUpdate && (
        <UpdateCard setProfileUpdate={setProfileUpdate} setUser={setUser} user={user} />
      )}
      {hovered && (
        <ImageUpload imgSize={size} setHovered={setHovered} setUser={setUser} user={user} />
      )}
      <main className="flex sm:flex-row flex-col max-w-screen-lg mx-auto pt-4 content-center relative ">
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
          <div className="h-52 w-full relative ">
            <img
              src={user?.bannerURL! || "/assets/pinkCover.jpg"}
              alt="user Cover Photo"
              className="object-center object-cover w-full h-48 rounded-md"
            />

            {edit && (
              <Edit3
                onClick={() =>
                  handlePhotoClick({
                    isbannerImage: true,
                    title: "Cover Photo",
                    intialImageUrl: user?.bannerURL ?? "/assets/pinkCover.jpg",
                  })
                }
                color="black"
                width={24}
                className="absolute top-2 right-2 h-7 w-7 bg-slate-200 sm:h-9  sm:w-9 border-2 p-1 rounded-full text-black dark:text-slate-400 border-slate-700 dark:border-slate-400 cursor-pointer "
              />
            )}
          </div>
          <section className="-mt-20 px-2">
            <div className="flex justify-between items-end">
              <div className=" relative inline-block">
                <img
                  src={user?.avatarURL ?? "/assets/user.png"}
                  alt="user"
                  onClick={() => {
                    edit &&
                      handlePhotoClick({
                        isbannerImage: false,
                        title: "Profile Photo",
                        intialImageUrl: user?.avatarURL ? user?.avatarURL! : "/assets/user.png",
                      });
                  }}
                  className=" w-[135px] h-[135px] relative inline-block border-4 border-white dark:border-slate-800 rounded-full object-cover cursor-pointer"
                />
              </div>
              <div className="flex gap-4 items-center">
                <button>
                  {edit && (
                    <Edit
                      width={25}
                      onClick={() => setProfileUpdate(true)}
                      className="h-7 w-7 sm:h-9 sm:w-9 border-2 p-1 rounded-full text-slate-700 dark:text-slate-400 border-slate-700 dark:border-slate-400 cursor-pointer "
                    />
                  )}
                </button>
                <Mail className="h-7 w-7 sm:h-9 sm:w-9 border-2 p-1 rounded-full text-slate-700 dark:text-slate-400 border-slate-700 dark:border-slate-400 cursor-pointer" />
                <ButtonLong href="#" size="normal">
                  Follow
                </ButtonLong>
              </div>
            </div>

            <article className="mt-2 space-y-4">
              <div className="space-y-1">
                <h1 className="text-xl font-semibold text-black dark:text-white">
                  {user && user?.fullName}{" "}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{user && user?.username}
                </p>
              </div>

              <p className="text-base">
                {user && user?.about
                  ? user?.about
                  : " Software-developer | Python | MERN | Next-Tailwind | Opensource"}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                <aside className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <p className="text-sm">
                    {user && user?.profession ? user?.profession : "Software-developer"}
                  </p>
                </aside>
                <aside className="flex items-center gap-2">
                  <MapPin size={16} />
                  <p className="text-sm">{user && user?.location ? user?.location : "India "} </p>
                </aside>
                <aside className="flex items-center gap-2">
                  <Link2 size={16} />
                  <Link href={"/#link"} className="hover:underline text-sm">
                    {user && user?.userLink ? user?.userLink : "https://www.google.com"}
                  </Link>
                </aside>
                <aside className="flex items-center gap-2">
                  <Calendar size={16} />
                  <p className="text-sm">
                    Joined on{" "}
                    {user && user?.$createdAt
                      ? new Date(user.$createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "8 jan 2012"}
                  </p>
                </aside>
                {/*     <aside className="flex items-center gap-2">
                  <Smile size={16} />
                  <p className="text-sm">
                    <span className="font-bold">9500 </span>followers
                  </p>
                </aside> */}
              </div>
            </article>
          </section>

          <div className="h-px w-full mt-6 bg-neutral-500 rounded-2xl" />

          <UserPosts userName={user! && user?.fullName!} userId={accountId} />
        </section>
        <div className="flex-[2] hidden md:block rounded-md">
          <TrendingFeed />
        </div>
      </main>
      <Footer />
    </>
  );
}
