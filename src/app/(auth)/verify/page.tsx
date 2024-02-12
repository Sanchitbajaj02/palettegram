"use client";
import { Suspense } from "react";
import Loader from "@/app/loading";
import VerificationComponent from "@/components/pages/auth/verification";
import Footer from "@/components/core/footer";
import Image from "next/image";
import { ButtonLong } from "@/components/core/buttons";
type VerifyProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function VerifyPage({ searchParams }: VerifyProps) {
  const { userId, secret, expire } = searchParams;

  if (userId === undefined && secret === undefined) {
    return (
      <>
        <section className="max-w-screen-md mx-auto h-screen flex justify-center items-center">
          <div className="card">
            <div className="flex flex-col gap-4 items-center ">
              <Image src={"/assets/logo.png"} alt="logo" height={80} width={80} />
              <h1 className="text-xl md:text-2xl mb-4 text-center font-bold text-secondary dark:text-white">
                Please check your inbox/spam and{" "}
                <span className="text-primary-light">verify your account</span>.
              </h1>
              <ButtonLong href="https://mail.google.com/mail/" size="normal" newTab>
                Open your email
              </ButtonLong>
            </div>
          </div>
        </section>
        <Footer isFixed />
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<Loader />}>
        <VerificationComponent accountId={String(userId)} secret={String(secret)} />
      </Suspense>
      <Footer isFixed />
    </>
  );
}
