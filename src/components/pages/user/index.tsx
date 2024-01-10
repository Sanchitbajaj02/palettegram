"use client";
import { useEffect, useState } from "react";
import UserPosts from "./userPosts";
import { getCurrentUser } from "@/backend/auth.api";

export default function User({ userId }: { userId: string }) {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    getCurrentUser()
      .then((resp: any) => {
        setUser(resp);
      })
      .catch(console.log);
  }, [userId]);

  return (
    <>
      <div className="mx-auto max-w-screen-lg mt-4">
        <h1 className="text-xl font-medium text-black dark:text-white">{user && user?.name}</h1>
        <h1 className="text-xl font-medium text-black dark:text-white">{user && user?.email}</h1>
        <UserPosts userId={userId} />
      </div>
    </>
  );
}
