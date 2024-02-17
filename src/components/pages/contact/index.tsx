"use client";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { toastify } from "@/helper/toastify";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Contact() {
  const [sendDetails, setSendDetails] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [ispending, setpending] = useState(false);

  const updateHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setSendDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setpending(true);
      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(sendDetails),
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
    <div className="overflow-hidden">
      <Navbar />
      <section className="max-w-screen-sm mx-auto h-70vh mt-4 flex justify-center items-center">
        <div className="card">
          <article className="mb-3">
            <h1 className="text-xl md:text-3xl mb-2 text-center font-bold text-secondary dark:text-white">
              Contact Us
            </h1>
          </article>

          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Your Email <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                onChange={updateHandler}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="subject"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Your Subject <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="subject"
                id="subject"
                placeholder="Your Subject"
                className="w-full rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                onChange={updateHandler}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                aria-required="true"
                className="mb-2 block text-sm font-medium text-secondary-light dark:text-gray-50"
              >
                Your Message <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                placeholder="Message"
                name="message"
                id="message"
                className="w-full h-32 rounded-md bg-white py-2 px-4 text-sm md:text-base font-medium text-secondary outline-none border border-white focus:border-secondary-light dark:border-secondary-light dark:focus:border-white"
                onChange={updateHandler}
              />
            </div>

            <div className="mb-0">
              <button
                type="submit"
                className="w-full py-2 text-sm md:text-base rounded-full text-white bg-primary transition duration-300 ease hover:bg-secondary"
                disabled={ispending}
              >
                {ispending ? (
                  <div className=" h-5 w-5 animate-spin rounded-full border-b-2 border-white dark:border-black"></div>
                ) : (
                  <p>Submit</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
