"use client";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { toastify } from "@/helper/toastify";
import { FormEvent, useState } from "react";

export default function Contact() {
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
  const [ispending, setpending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setpending(true);
      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({
          email,
          message,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.status === 200) {
        toastify("message sent successfully", "success");
        setpending(false);
      }
    } catch (error) {
      toastify("Please try again later", "error");
      setpending(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="  flex items-center justify-center flex-col">
        <h1 className=" font-bold text-3xl mt-5"> Contact Us</h1>
        <form
          className="mt-10 mb-10 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            required
            max={200}
            type="email"
            placeholder="Your Email"
            className=" p-4 w-[60vh] h-10 rounded-2xl  dark:text-white text-black border-2"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <textarea
            required
            placeholder="Message"
            className=" h-52  p-4 rounded-2xl w-[60vh] mt-8 border-2 border-black  dark:text-white text-black"
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          {ispending ? (
            <button
              className="px-10 py-2 text-base w-[30vh]  mt-8
           rounded-full text-white bg-primary  transition hover:bg-primary-light hover:scale-105 flex items-center justify-center "
              disabled
            >
              <div className=" h-5 w-5 animate-spin rounded-full border-b-2 border-white dark:border-black"></div>
            </button>
          ) : (
            <button
              className="px-10 py-2 text-base w-[30vh]  mt-8
           rounded-full text-white bg-primary  transition hover:bg-primary-light hover:scale-105"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      </div>

      <div className=" bottom-0 fixed w-full">
        <Footer />
      </div>
    </>
  );
}
