"use client";
import React from "react";
import UserPosts from "./userPosts";
import { useSelector } from "react-redux";

export default function User() {
  const authState = useSelector((state: any) => state.auth);

  return (
    <>
      <div className="mx-auto max-w-screen-lg mt-4">
        <h1 className="text-xl font-medium text-black dark:text-white">{authState.creds?.email}</h1>
        <UserPosts user={null} />
      </div>
    </>
  );
}
