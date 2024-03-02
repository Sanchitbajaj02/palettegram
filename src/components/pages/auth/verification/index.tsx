"use client";
import { useEffect, useState } from "react";
import { verifyUser } from "@/backend/auth.api";
import { useRouter } from "next/navigation";
import { toastify } from "@/helper/toastify";
import { ButtonLong } from "@/components/core/buttons";
import { setCookie } from "nookies";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import Image from "next/image";
import { verificationResponseType } from "@/types/auth";
import Loader from "@/app/loading";

interface Verification {
  accountId: string;
  secret: string;
}

type verify = "LOAD" | "TRUE" | "FALSE";

export default function VerificationComponent({ accountId, secret }: Verification) {
  const [isVerified, setVerified] = useState<verify>("LOAD");
  const [showConfetti, setshowConfetti] = useState(false);
  const router = useRouter();

  const window = useWindowSize();

  const confetti = () => {
    setshowConfetti(true);
    setTimeout(() => {
      setshowConfetti(false);
    }, 10000);
  };

  useEffect(() => {
    verifyUser(accountId, secret)
      .then((resp: verificationResponseType) => {
        if (resp.status) {
          confetti();
          setVerified("TRUE");
          setCookie(null, "isVerified", String(resp.status));
        }
      })
      .catch((err) => {
        setVerified("FALSE");
        console.log(err.message);
        toastify(err.message, "error");
      });
  }, [router, secret, accountId]);

  return (
    <>
      {showConfetti && (
        <Confetti width={window.width} height={window.height} numberOfPieces={150} />
      )}

      <section className="max-w-screen-md mx-auto h-[80vh] flex justify-center items-center">
        <article className="card">
          <div className="flex flex-col gap-4 items-center ">
            <Image src={"/assets/logo.png"} alt="logo" height={80} width={80} />

            {isVerified === "TRUE" ? (
              <>
                <h1 className="text-xl md:text-2xl mb-4 text-center font-bold text-secondary dark:text-white">
                  Congratulation!! You are verified 👏
                </h1>
                <ButtonLong href="/feed" size="normal">
                  Click to join community
                </ButtonLong>
              </>
            ) : isVerified === "FALSE" ? (
              <h1 className="text-xl md:text-2xl mb-4 text-center font-bold text-secondary dark:text-white">
                Sorry! It seems you are not verified yet 😣
              </h1>
            ) : (
              <Loader />
            )}
          </div>
        </article>
      </section>
    </>
  );
}
