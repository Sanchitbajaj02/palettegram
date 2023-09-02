"use client";
// import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
// import { isLoggedIn } from "@/backend/auth.api";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   isLoggedIn()
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));

  //   return () => {
  //     console.log("clear");
  //   };
  // }, []);

  return <Provider store={store}>{children}</Provider>;
}
