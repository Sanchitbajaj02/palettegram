"use client";
import { useEffect, useState } from "react";
import { getBookmarks } from "@/backend/bookmarks.api";
import { parseCookies } from "nookies";
import { useSelector, useDispatch } from "react-redux";
import { saveBookmarkToStore } from "@/redux/reducers/bookmarkReducer";

export default function UserBookmark() {
  const [load, setLoad] = useState<boolean>(true);
  const dispatch = useDispatch();

  const userBookmarks = useSelector((state: any) => state.bookmarks);

  const cookies = parseCookies();

  useEffect(() => {
    getBookmarks(cookies["userId"])
      .then((bookm) => {
        console.log(bookm);
        dispatch(
          saveBookmarkToStore({
            accountId: cookies["userId"],
            bookmark: bookm?.documents[0].bookmark,
          }),
        );
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setLoad(true);
      });

    return () => {
      console.log("clear");
    };
  }, [dispatch]);

  if (userBookmarks.error || (userBookmarks && userBookmarks.bookmark.length <= 0)) {
    return <h1 className="text-white text-3xl">error...</h1>;
  }

  if (userBookmarks.loading || load) {
    return <h1 className="text-white text-3xl">Loading...</h1>;
  }

  return (
    <>
      <section className="mx-auto max-w-screen-lg mt-4">
        <h1 className="text-black dark:text-white text-lg font-bold">My saved items</h1>

        {userBookmarks &&
          userBookmarks.bookmark.map((ids: string, i: number) => {
            return <p key={i}>{ids}</p>;
          })}
      </section>
    </>
  );
}
