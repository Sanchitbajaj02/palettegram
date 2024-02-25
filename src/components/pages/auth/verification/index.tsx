"use client";
import { useEffect, useState } from "react";
import { verifyUser } from "@/backend/auth.api";
import { useRouter } from "next/navigation";
import { toastify } from "@/helper/toastify";
import { ButtonLong } from "@/components/core/buttons";
import Loader from "@/app/loading";
import { setCookie } from "nookies";
import JSConfetti from 'js-confetti'
//const jsConfetti = new JSConfetti();
//console.log(jsConfetti);
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti'

import Image from "next/image";

interface Verification {
  userId: string;
  secret: string;
}



export default function VerificationComponent({ userId, secret }: Verification) {
  const [isVerified, setVerified] = useState(false);
  const [showConfetti, setshowConfetti] = useState(false);
  const window=useWindowSize();
  const confetti=()=>{
    setshowConfetti(true);
 const timeout=   setTimeout(()=>{setshowConfetti(false)},5000);

  }
  const router = useRouter();
  

  useEffect(() => {
    //jsConfetti.addConfetti();
    verifyUser(userId, secret)
      .then((resp) => {
        if (resp.status) {
          
          setVerified(resp.status);
          confetti();
          setCookie(null, "isVerified", "true");
          //jsConfetti.addConfetti();
        }
      })
      .catch((err) => {
        console.log(err.message);

        toastify(err.message, "error");
      });
  }, [router, secret, userId]);

  return (
    <>
  {showConfetti &&    <Confetti
      width={window.width}
      height={window.height}
      
     
      numberOfPieces={150}
    />}

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
