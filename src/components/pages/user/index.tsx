"use client";
import { useState, Suspense, useMemo } from "react";
import {
  Briefcase,
  Link2,
  Mail,
  MapPin,
  ArrowLeft,
  Edit,
  Edit3,
  Calendar,
  Share2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import Loader from "@/app/loading";
import TrendingFeed from "@/components/core/trendingFeed";
import Footer from "@/components/core/footer";
import { ButtonLong } from "@/components/core/buttons";
import { toastify } from "@/helper/toastify";
import UserPosts from "./userPosts";
import ImageUpload from "./imageUpload";
import UpdateCard from "./updateCard";

import { useSelector } from "react-redux";
import { userCollectionDB } from "@/types/auth";

import { userImageUploadSizeTypes } from "@/types";

export default function User({ userId }: { userId: string }) {
  const router = useRouter();
  const cookies = parseCookies();
  const currentUserID: string = cookies["userId"];

  const userAuth: userCollectionDB = useSelector((state: any) => state.auth.data);

  const [hovered, setHovered] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [size, setSize] = useState<userImageUploadSizeTypes>({
    isbannerImage: false,
    intialImageUrl: "",
    title: "",
  });

  const updateImagesHandler = ({
    isbannerImage,
    title,
    intialImageUrl,
  }: userImageUploadSizeTypes) => {
    setSize({
      isbannerImage: isbannerImage,
      intialImageUrl: intialImageUrl,
      title: title,
    });
    setHovered(true);
  };

  const ShareHandler = async () => {
    try {
      const shareData = {
        title: "Share Profile!!",
        text: "Share your profile!!",
        url: window.location.href,
      };
      await navigator.share(shareData);
    } catch (err) {
      + toastify(`Failed to share profile`, "error");
    }
  };

  const CopyHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toastify("Profile URL copied!!", "success");
    } catch (err) {
      + toastify(`Failed to share profile`, "error");
    }
  };

  return (
    <>
      {profileUpdate && <UpdateCard setProfileUpdate={setProfileUpdate} />}
      {hovered && <ImageUpload imgSize={size} setHovered={setHovered} />}
      <Suspense fallback={<Loader />}>
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
                src={
                  userAuth && userAuth?.bannerURL
                    ? userAuth?.bannerURL
                    : "https://placehold.co/1200x300"
                }
                alt="user Cover Photo"
                className="object-center object-cover w-full h-48 rounded-md"
                width={1200}
                height={300}
              />

              {currentUserID && (
                <Edit3
                  onClick={() =>
                    currentUserID &&
                    updateImagesHandler({
                      isbannerImage: true,
                      title: "Background Banner Image",
                      intialImageUrl:
                        userAuth && userAuth?.bannerURL
                          ? userAuth?.bannerURL
                          : "https://placehold.co/1200x300",
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
                    src={
                      userAuth && userAuth?.avatarURL
                        ? userAuth?.avatarURL
                        : "https://placehold.co/100x100"
                    }
                    alt="user"
                    onClick={(e: any) => {
                      currentUserID &&
                        updateImagesHandler({
                          isbannerImage: false,
                          title: "Profile Image",
                          intialImageUrl:
                            userAuth && userAuth?.avatarURL
                              ? userAuth?.avatarURL
                              : "https://placehold.co/100x100",
                        });
                    }}
                    width={1200}
                    height={300}
                    className=" w-[135px] h-[135px] relative inline-block border-4 border-white dark:border-slate-800 rounded-full object-cover cursor-pointer"
                  />
                </div>
                <div className="flex gap-2 sm:gap-4 items-center">
                  <button type="button">
                    <Share2
                      width={22}
                      onClick={() => ShareHandler()}
                      className="sm:hidden h-7 w-7 sm:h-9 sm:w-9 border-2 p-1 rounded-full text-slate-700 dark:text-slate-400 border-slate-700 dark:border-slate-400 cursor-pointer "
                    />
                    <Share2
                      width={22}
                      onClick={() => CopyHandler()}
                      className="hidden sm:inline h-7 w-7 sm:h-9 sm:w-9 border-2 p-1 rounded-full text-slate-700 dark:text-slate-400 border-slate-700 dark:border-slate-400 cursor-pointer "
                    />
                  </button>
                  <button type="button">
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
                    {userAuth && userAuth?.fullName}
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
                    <Calendar size={16} />
                    <p className="text-sm">
                      Joined on{" "}
                      {userAuth && userAuth.$createdAt
                        ? new Date(userAuth.$createdAt).toLocaleDateString("en-US", {
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
                      {userAuth && userAuth?.profession ? userAuth?.profession : "No Data"}
                    </p>
                  </aside>
                  <aside className="flex items-center gap-2">
                    <MapPin size={16} />
                    <p className="text-sm">
                      {userAuth && userAuth.location ? userAuth.location : "No Data"}
                    </p>
                  </aside>
                  <aside className="flex items-center gap-2">
                    <Link2 size={16} />
                    {userAuth?.userLink ? (
                      <Link href={userAuth.userLink} className="hover:underline text-sm">
                        {userAuth.userLink}
                      </Link>
                    ) : (
                      <p>No Data</p>
                    )}
                  </aside>
                </div>
              </article>
            </section>

            <div className="h-px w-full mt-6 bg-neutral-500 rounded-2xl" />

            {userId && <UserPosts userId={userId} />}
          </section>
          <div className="flex-[2] hidden md:block rounded-md">
            <TrendingFeed />
          </div>
        </main>
      </Suspense>
      <Footer />
    </>
  );
}
