"use client";
import { useEffect, useState } from "react";
import { verifyUser } from "@/backend/auth.api";
import { useRouter } from "next/navigation";
import { toastify } from "@/helper/toastify";
import { ButtonLong } from "@/components/core/buttons";
import Loader from "@/app/loading";
import { setCookie } from "nookies";
import Image from "next/image";

interface Verification {
  userId: string;
  secret: string;
}

export default function VerificationComponent({ userId, secret }: Verification) {
  const [isVerified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    verifyUser(userId, secret)
      .then((resp) => {
        if (resp.status) {
          setVerified(resp.status);
          setCookie(null, "isVerified", "true");
        }
      })
      .catch((err) => {
        console.log(err.message);

        toastify(err.message, "error");
      });
  }, [router, secret, userId]);

  return (
    <>
      <section className="max-w-screen-md mx-auto h-screen flex justify-center items-center">
        <div className="card">
          <div className="flex flex-col gap-4 items-center ">
            <Image src={"/assets/logo.png"} alt="logo" height={80} width={80} />
            <h1 className="text-xl md:text-2xl mb-4 text-center font-bold text-secondary dark:text-white">
              Congratulation!! You are verified 👏
            </h1>
            {isVerified ? (
              <ButtonLong href="/feed" size="normal">
                Click to join community
              </ButtonLong>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
