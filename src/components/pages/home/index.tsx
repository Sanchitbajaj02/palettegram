"use client";
import Image from "next/image";
import { ButtonLong } from "@/components/core/buttons";
import { motion } from "framer-motion";

import Newsletter from "../../core/newsletter/index";

function HomePage({ accountId }: { accountId: string | undefined }) {
  return (
    <>
      <main className="max-w-screen-lg mx-auto px-4 md:px-10 lg:px-5">
        <section className="flex flex-col items-center mt-28 mb-32 gap-4 md:flex-row md:justify-between">
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
              className="text-3xl font-bold text-center tracking-wide text-secondary dark:text-white md:text-5xl lg:text-6xl md:text-left"
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
              className="text-xl my-6 font-medium text-center text-secondary dark:text-white md:text-xl lg:text-2xl md:text-left"
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
              id="start-your-journey"
            >
              {accountId ? (
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
              initial={{ opacity: 0, y: -200 }}
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
                src="/assets/img-1.png"
                alt="What is palettegram section"
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
              className="text-3xl md:text-4xl lg:text-6xl text-center font-extrabold tracking-wide text-black dark:text-white md:text-right"
            >
              What is Palettegram?
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
              className="text-xl md:text-lg lg:text-xl text-center my-8 text-black dark:text-white md:text-right"
            >
              A social media platform built exclusively for design professionals to share, discover and discuss cutting-edge UI/UX designs and color palettes.
            </motion.p>
          </article>
        </section>

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
              Who is it for?
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
              Are you a developer looking for design inspiration for your next website? Browse through a variety of styles by other developers and get inspired!
            </motion.p>
          </article>

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
                src="/assets/img-2.png"
                alt="Who is palettegram for section"
                loading="lazy"
                width={600}
                height={500}
                className="mx-auto rounded"
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
                src="/assets/img-3.png"
                alt="What you can do section"
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
              Create, Showcase Collaborate
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
              Show off your design talent through projects, blogs and get feedback from other developers. Partner up with others, be a part of a collaborative community. 
            </motion.p>
          </article>
        </section>
        <section className="w-full">
              <Newsletter />
        </section> 
      </main>
    </>
  );
}
export default HomePage;
