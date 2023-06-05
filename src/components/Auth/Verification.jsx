import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "../../DB/api";

export default function Verify() {
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  const [isVerified, setVerified] = useState(false);

  useEffect(() => {
    console.log(searchParams.get("userId"));

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    verifyUser(userId, secret)
      .then((resp) => {
        if (resp.status) {
          // navigate("/feed");
          console.log(resp);
          setVerified(resp.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, searchParams]);

  return (
    <>
      <section className="max-w-screen-sm mx-auto h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center font-bold">You are verified</h1>
        <button
          className="px-16 py-2 mt-8 text-xl rounded-full text-white bg-[#F1396D] disabled:bg-[#f1396db1]"
          onClick={() => navigate("/feed")}
          disabled={isVerified}
        >
          Start your feed
        </button>
      </section>
    </>
  );
}
