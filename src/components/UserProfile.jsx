import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUserPosts } from "../DB/api";
import UserPosts from "./UserPosts";

export default function Profile() {
  const { username } = useParams();
  console.log(username);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    getAllUserPosts("647316b4e96e496746e9")
      .then((res) => {
        setUser(res.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return user && (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <UserPosts user={user} />
      </div>
    </div>
  );
}