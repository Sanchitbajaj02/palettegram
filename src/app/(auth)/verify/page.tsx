"use client";
import React from "react";
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
        <div className="h-screen w-full overflow-hidden">
          <section className="h-fit w-full max-w-2xl mx-auto mt-40 rounded-3xl p-6 flex flex-col justify-center items-center gap-8 bg-white/20 backdrop-blur-md ">
            <div className="flex flex-col gap-3 items-center">
              <Image src={"/assets/logo.png"} alt="logo" height={60} width={60} />
              <h3 className="text-center font-semibold text-xl">
                Please check your inbox and{" "}
                <span className="text-primary-light">verify your account</span>.
              </h3>
            </div>
            <ButtonLong href="https://mail.google.com/mail/" size="small">
              Open Mail
            </ButtonLong>
          </section>
        </div>
        <Footer isFixed />
      </>
    );
  }
  return (
    <>
      <VerificationComponent userId={String(userId)} secret={String(secret)} />
      <Footer isFixed />
    </>
  );
}
