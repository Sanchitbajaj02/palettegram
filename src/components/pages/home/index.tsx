"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getCurrentUser } from "@/backend/auth.api";
import { saveUser } from "@/redux/reducers/authReducer";
import { ButtonLong } from "@/components/core/buttons";
import { parseCookies } from "nookies";
import { toastify } from "@/helper/toastify";
import { motion } from "framer-motion";

function HomePage() {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const accountIdFromCookies: string = cookies["accountId"];

  const state = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (accountIdFromCookies) {
      getCurrentUser()
        .then((resp) => {
          if (resp) {
            const payload = {
              userId: resp["$id"],
              email: resp["email"],
              isVerified: resp["emailVerification"],
              createdAt: resp["$createdAt"],
            };

            dispatch(saveUser(payload));
          }
        })
        .catch((err) => {
          console.log(err);

          toastify(err.message, "error");
        });
    }
  }, [dispatch, accountIdFromCookies]);

  return (
    <>
      <main className="max-w-screen-lg mx-auto px-2">
        <section className="flex flex-col items-center mt-32 mb-32 gap-4 md:flex-row md:justify-between">
          <article>
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 110,
                delay: 0,
              }}
              className="text-3xl font-bold text-center tracking-wide text-secondary dark:text-white md:text-6xl md:text-left"
            >
              Present Palettes Around the World
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 110,
                delay: 0.1,
              }}
              className="text-xl my-6 font-medium text-center text-secondary dark:text-white md:text-2xl md:text-left"
            >
              Transform ideas into Beautiful Palettes, Inspire Fellow Designers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 110,
                delay: 0.2,
              }}
              className="flex justify-center md:justify-start"
            >
              {state?.creds.userId && state?.creds.userId !== "" ? (
                <ButtonLong href="/feed" size="big">
                  Checkout your feed
                </ButtonLong>
              ) : (
                <ButtonLong href="/register" size="big">
                  Start your journey
                </ButtonLong>
              )}
            </motion.div>
          </article>

          <figure className="w-[70%] my-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -640 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 80,
              }}
            >
              <Image
                src="/assets/header.png"
                alt="Header section"
                loading="lazy"
                width={400}
                height={400}
                className="custom-shadow floating-image"
              />
            </motion.div>
          </figure>
        </section>

        <section className="flex items-center flex-col-reverse md:flex-row gap-4 mt-32 mb-32">
          <figure className="w-[70%]">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 80,
                delay: 0.2,
              }}
            >
              <Image
                src="/assets/palettegram-for.png"
                alt="Who is palettegram for section"
                loading="lazy"
                width={600}
                height={500}
                className="mx-auto rounded"
              />
            </motion.div>
          </figure>
          <article>
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 80,
                delay: 0,
              }}
              className="text-3xl md:text-6xl text-center font-extrabold tracking-wide text-black dark:text-white md:text-right"
            >
              Who is <br /> Palettegram for?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 80,
                delay: 0.1,
              }}
              className="text-xl md:text-2xl text-center my-8 text-black dark:text-white md:text-right"
            >
              Anyone who wants to share their designs and color palettes to get the review among the
              professionals.
            </motion.p>
          </article>
        </section>
      </main>
    </>
  );
}
export default HomePage;
