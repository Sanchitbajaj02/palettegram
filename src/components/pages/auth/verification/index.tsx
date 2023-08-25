"use client";
import { useEffect, useState } from "react";
import { verifyUser } from "@/backend/auth.api";
import { useRouter } from "next/navigation";

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
          // navigate("/feed");
          router.push("/feed");
          console.log(resp);
          setVerified(resp.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router, secret, userId]);

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center font-bold">You are verified</h1>
        <button
          className="px-16 py-2 mt-8 text-xl rounded-full text-white bg-pg-pink disabled:pg-pink-light"
          onClick={() => router.push("/feed")}
          disabled={isVerified}
        >
          Start your feed
        </button>
      </section>
    </>
  );
}
