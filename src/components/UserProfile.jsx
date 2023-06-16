import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUserPosts } from "../DB/api";
import UserPosts from "./UserPosts";
import { useSelector } from "react-redux";

export default function Profile() {
  const { userId } = useParams();
  console.log(userId);
  const [user, setUser] = useState(null);

  const authState = useSelector((state) => state.authenticator);

  useEffect(() => {
    getAllUserPosts(userId)
      .then((res) => {
        console.log(res);
        setUser(res.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    user && (
      <div className="bg-gray-background">
        <div className="mx-auto max-w-screen-lg mt-4">
          <h1 className="text-2xl font-medium">{authState?.fullName}</h1>
          <UserPosts user={user} />
        </div>
      </div>
    )
  );
}
