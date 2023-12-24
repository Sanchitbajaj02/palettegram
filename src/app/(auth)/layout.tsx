import React from "react";
import BlobBackground from "@/components/core/blob";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="text-primary">
        <div className="fixed -z-[1] left-1/3 w-12 top-2/3 blur-xl">
          <BlobBackground blur />
        </div>
        <div className="fixed -z-[1] left-2/3 w-12 top-1/3 blur-xl">
          <BlobBackground blur />
        </div>
        <div className="fixed -z-[1] left-1/4 w-40 top-1/4 blur-xl opacity-50">
          <BlobBackground blur />
        </div>
        <div className="fixed -z-[1] left-1/2 w-32 top-1/2 blur-xl opacity-60">
          <BlobBackground blur />
        </div>
        <div className="fixed -z-[1] left-[45%] w-12 top-1/3 blur-xl">
          <BlobBackground blur />
        </div>
        <div className="fixed -z-[1] left-3/4 w-60 top-1/3 opacity-20 blur-xl">
          <BlobBackground blur />
        </div>
      </div>
      {children}
    </>
  );
}
