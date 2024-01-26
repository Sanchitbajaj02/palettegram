"use client";
import { useEffect, useState } from "react";
import { verifyUser } from "@/backend/auth.api";
import { useRouter } from "next/navigation";
import { toastify } from "@/helper/toastify";
import { ButtonLong } from "@/components/core/buttons";
import Loader from "@/app/loading";
import { setCookie } from "nookies";

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
          setCookie(null,'isVerified', 'true')
        }
      })
      .catch((err) => {
        console.log(err.message);

        toastify(err.message, "error");
      });
  }, [router, secret, userId]);

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex justify-center items-center">
        <div className="card">
          <h1 className="text-xl md:text-3xl mb-8 text-center font-bold text-secondary dark:text-white">
            You are verified 👏
          </h1>
          {/* <p className="text-base md:text-xl text-center font-normal text-secondary-light dark:text-gray-50">
            Register and be a part of the amazing community
          </p> */}
          <div className="text-center">
            {isVerified ? (
              <ButtonLong href="/feed" size="big">
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
