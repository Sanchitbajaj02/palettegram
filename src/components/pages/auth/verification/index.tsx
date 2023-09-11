"use client";
import { useEffect, useState } from "react";
import { verifyUser } from "@/backend/auth.api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toastify } from "@/helper/toastify";

import { toast } from "react-toastify";

type Verification = {
  userId: string;
  secret: string;
};

export default function VerificationComponent({ userId, secret }: Verification) {
  const [isVerified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    verifyUser(userId, secret)
      .then((resp) => {
        if (resp.status) {
          router.push("/feed");
          console.log(resp);
          setVerified(resp.status);
        }
      })
      .catch((err) => {
        console.log(err.message);

        toastify(err.message, "error");
      });
  }, [router, secret, userId]);

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex flex-col justify-center items-center">
        <div className="bg-gray-200/50 w-full p-4 mx-2 md:m-0 md:p-8 rounded-xl shadow-lg flex flex-col">
          <h1 className="text-4xl text-center font-bold">You are verified</h1>
          <Link
            href="/feed"
            className="px-16 py-2 mt-8 text-center text-xl rounded-full text-white bg-primary"
          >
            Start your feed
          </Link>
        </div>
      </section>
    </>
  );
}
