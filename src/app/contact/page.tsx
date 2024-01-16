"use client";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { toastify } from "@/helper/toastify";
import { FormEvent, useState } from "react";

const contact = () => {
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
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
        console.log("Done");
        toastify("message sent successfully", "success");
      }
    } catch (error) {
      console.log(error);
      toastify("Please try again later", "error");
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
            type="text"
            placeholder="Your Email"
            className=" p-4 w-[60vh] h-10 rounded-2xl text-white "
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <textarea
            required
            placeholder="Message"
            className=" h-52  p-4 rounded-2xl w-[60vh] mt-8"
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          <button
            className="px-10 py-2 text-base w-[30vh]  mt-8
            rounded-full text-white bg-primary  transition hover:bg-primary-light hover:scale-105"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className=" bottom-0 fixed w-full">
        <Footer />
      </div>
    </>
  );
};

export default contact;
