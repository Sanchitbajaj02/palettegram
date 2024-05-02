"use client";
import { useEffect, useState, Suspense } from "react";
import { Briefcase, Link2, Mail, MapPin, ArrowLeft, Edit, Edit3, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import Loader from "@/app/loading";
import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";
import { ButtonLong } from "@/components/core/buttons";

import UserPosts from "./userPosts";
import ImageUpload from "./imageUpload";
import UpdateCard from "./updateCard";

import { useSelector } from "react-redux";
import { userCollectionDB } from "@/types/auth";

import { userImageUploadSizeTypes } from "@/types";

export default function User({ userId }: { userId: string }) {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [size, setSize] = useState<userImageUploadSizeTypes>({
    isbannerImage: false,
    intialImageUrl: "",
    title: "",
  });
  const cookies = parseCookies();

  const userAuth: userCollectionDB = useSelector((state: any) => state.auth.data);

  const handlePhotoClick = ({ isbannerImage, title, intialImageUrl }: userImageUploadSizeTypes) => {
    setSize({
      isbannerImage: isbannerImage,
      intialImageUrl: intialImageUrl,
      title: title,
    });
    setHovered(true);
  };
  const currentUserID: string = cookies["userId"];

  useEffect(() => {
    if (userAuth) setUser(userAuth);
  }, [cookies, userAuth, currentUserID]);

  console.log("param userid:", user);

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
            <Image
              src={user && user?.bannerURL ? user?.bannerURL! : "https://placehold.co/1200x300"}
              alt="user Cover Photo"
              className="object-center object-cover w-full h-48 rounded-md"
              width={1200}
              height={300}
            />

            {currentUserID && (
              <Edit3
                onClick={() =>
                  handlePhotoClick({
                    isbannerImage: true,
                    title: "Cover Photo",
                    intialImageUrl:
                      user && user?.bannerURL ? user?.bannerURL! : "https://placehold.co/1200x300",
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
                <Image
                  src={user && user?.avatarURL ? user?.avatarURL! : "https://placehold.co/100x100"}
                  alt="user"
                  onClick={() => {
                    currentUserID &&
                      handlePhotoClick({
                        isbannerImage: false,
                        title: "Profile Photo",
                        intialImageUrl:
                          user && user?.avatarURL
                            ? user?.avatarURL!
                            : "https://placehold.co/100x100",
                      });
                  }}
                  width={1200}
                  height={300}
                  className=" w-[135px] h-[135px] relative inline-block border-4 border-white dark:border-slate-800 rounded-full object-cover cursor-pointer"
                />
              </div>
              <div className="flex gap-4 items-center">
                <button>
                  {currentUserID && (
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
                {user?.about ? user?.about : "Professional palettegram user"}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                <aside className="flex items-center gap-2">
                  <Calendar size={16} />
                  <p className="text-sm">
                    Joined on{" "}
                    {user && user.$createdAt
                      ? new Date(user.$createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : new Date().toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                  </p>
                </aside>
                <aside className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <p className="text-sm">
                    {user && user?.profession ? user?.profession : "No Data"}
                  </p>
                </aside>
                <aside className="flex items-center gap-2">
                  <MapPin size={16} />
                  <p className="text-sm">{user && user.location ? user.location : "No Data"}</p>
                </aside>
                <aside className="flex items-center gap-2">
                  <Link2 size={16} />
                  {user?.userLink ? (
                    <Link href={user.userLink} className="hover:underline text-sm">
                      {user.userLink}
                    </Link>
                  ) : (
                    <p>No Data</p>
                  )}
                </aside>
              </div>
            </article>
          </section>

          <div className="h-px w-full mt-6 bg-neutral-500 rounded-2xl" />

          {userId && (
            <Suspense fallback={<Loader />}>
              <UserPosts userId={userId} />
            </Suspense>
          )}
        </section>
        <div className="flex-[2] hidden md:block rounded-md">
          <TrendingFeed />
        </div>
      </main>
      <Footer />
    </>
  );
}
