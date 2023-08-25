import React from "react";
import VerificationComponent from "@/components/pages/auth/verification";
import Footer from "@/components/core/footer";
type VerifyProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function VerifyPage({ searchParams }: VerifyProps) {
  const { userId, secret, expire } = searchParams;

  return (
    <>
      <VerificationComponent userId={String(userId)} secret={String(secret)} />
      <Footer />
    </>
  );
}
