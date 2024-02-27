import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Copy } from "react-feather";
import { toastify } from "@/helper/toastify";

export default function HowToSetup_Appwrite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toastify(`Copied to clipbroad`, "success");
    } catch (error) {
      console.log(`copy clipboard error` + error);
      toastify(`Oops! Something went wrong. Please try again.`, "error");
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="fixed bottom-2 left-0 right-0 h-2 bg-primary origin-center"
        style={{ scaleX }}
      />
      <section className="md:max-w-screen-lg mx-auto">
        <div className="mt-10">
          <h4 className="p-4 my-5 text-2xl md:text-4xl text-center font-extrabold tracking-wide text-black dark:text-white ">
            If you want to setup Appwrite instance, follow these steps
          </h4>
          <h5 className="mt-10 text-lg font-semibold leading-9">
            {" "}
            <span className="text-primary-light"> Step 1:</span> Creating an account on Appwrite
            Cloud.
          </h5>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="my-2"
        >
          <h5 className="mt-4 mb-2 text-lg font-semibold leading-9">
            <span className="text-primary-light"> Step 2:</span> Create a new project with any name
            you want and choose web as a platform.
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/new-proj.jpg"}
            width={1200}
            height={500}
            alt="create project"
          />
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/proj-name.jpg"}
            width={1200}
            height={500}
            alt="create project 2"
          />
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/web-proj.jpg"}
            width={1200}
            height={500}
            alt="create project 3"
          />
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/hostname.jpg"}
            width={1200}
            height={500}
            alt="hostname"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="my-2"
        >
          <h5 className="mt-10 mb-2 text-lg font-semibold leading-9">
            <span className="text-primary-light"> Step 3:</span>
            Copy<span className="bg-primary m-1 p-[1px] rounded ">.env.example</span> file to{" "}
            <span className="bg-primary mx-1 p-1 rounded ">.env.local</span> and
            <span className="bg-primary mx-1 p-1 rounded ">appwrite-gen/.env.example</span> file to{" "}
            <span className="bg-primary mx-1 p-1 rounded ">appwrite-gen/.env</span> manually or
            using:
          </h5>
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {`cp .env.example .env.local
cp appwrite-gen/.env.example appwrite-gen/.env`}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() =>
                handleCopyClick(
                  "cp .env.example .env.local cp appwrite-gen/.env.example appwrite-gen/.env",
                )
              }
            />
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="my-2"
        >
          <h5 className="mt-10 mb-2 text-lg font-semibold leading-9">
            <span className="text-primary-light"> Step 4: </span> Go to settings and copy your
            project id and paste it in{" "}
            <span className="bg-primary mx-1 p-1 rounded "> .env.local </span> file as well as in{" "}
            <span className="bg-primary mx-1 p-1 rounded ">appwrite-gen/.env </span> files.
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/proj-setting.jpg"}
            width={1200}
            height={500}
            alt="project setting"
          />
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/proj-id.jpg"}
            width={1200}
            height={500}
            alt="project id"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="my-2"
        >
          <h5 className="mt-10 mb-2 text-lg font-semibold leading-9">
            <span className="text-primary-light"> Step 5:</span>
            While on the settings page click on View API Keys button
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/api-button.jpg"}
            width={1200}
            height={500}
            alt="api button"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="my-2"
        >
          <h5 className="mt-10 mb-2 text-lg font-semibold leading-9">
            <span className="text-primary-light"> Step 6:</span>
            Create an <span className="bg-primary mx-1 p-1 rounded "> API key </span> with any name
            you like, set the scopes to all and copy it value and paste it in{" "}
            <span className="bg-primary mx-1 p-1 rounded ">appwrite-gen/.env </span> file as{" "}
            <span className="bg-primary mx-1 p-1 rounded ">PROJECT_API_KEY </span>variable.
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/api-key.jpg"}
            width={1200}
            height={500}
            alt="api key"
          />
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/scopes.jpg"}
            width={1200}
            height={500}
            alt="scopes"
          />
          <Image
            className="shadow shadow-gray-500 border-[1px] mb-3 border-primary rounded-lg"
            src={"/assets/contribute/copy-api.jpg"}
            width={1200}
            height={500}
            alt="copy api"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="my-2"
        >
          <h5 className="mt-10 mb-2 text-lg font-semibold leading-9">
            <span className="text-primary-light"> Step 7:</span>
            Setup your database with the command:
          </h5>
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {`yarn schema:prepare`}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() => handleCopyClick("yarn schema:prepare")}
            />
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="my-2"
        >
          <h5 className="mt-10 mb-2 text-lg font-semibold leading-9">
            <span className="text-primary-light"> Step 8:</span>
            Fill in the rest of <span className="bg-primary mx-1 p-1 rounded ">
              {" "}
              .env.local{" "}
            </span>{" "}
            file with the appropriate ids if not already set.
          </h5>
        </motion.div>

        <p className="p-4 my-5 text-3xl md:text-4xl text-center font-extrabold tracking-wide text-black dark:text-white ">
          🫡 All set start coding
        </p>
      </section>
    </div>
  );
}
