import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Copy } from "lucide-react";
import { toastify } from "@/helper/toastify";

export default function HowToSetup_dev() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toastify(`Copied to clipboard`, "success");
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
        <h4 className="p-4 my-5 text-2xl md:text-4xl text-center font-extrabold tracking-wide text-black dark:text-white ">
          If you want to setup project locally, follow these steps
        </h4>
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
          className="mt-10 mb-2"
        >
          <h5 className="mt-6 mb-2 text-lg font-semibold">
            <span className="text-primary-light"> Step 1:</span> Navigate to Palettegram Directory
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/cd_pal.png"}
            width={1200}
            height={100}
            alt="Navigating to Palettegram directory"
          />
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"cd palettegram"}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() => handleCopyClick("cd palettegram")}
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
          <h5 className="mt-10 mb-2 text-lg font-semibold">
            <span className="text-primary-light"> Step 2:</span> Add a reference(upstream) to the
            original repository
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/add_upstream.png"}
            width={1200}
            height={100}
            alt="Adding upstream repository"
          />

          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"git remote add upstream https://github.com/Sanchitbajaj02/palettegram"}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() =>
                handleCopyClick(
                  "git remote add upstream https://github.com/Sanchitbajaj02/palettegram",
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 3:</span> Add a reference(origin) to the
            remote repository
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/add_origin.png"}
            width={1200}
            height={100}
            alt="Adding origin repository"
          />

          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"git remote add origin git clone https://github.com/<your_username>/palettegram.git"}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() =>
                handleCopyClick(
                  "git remote add origin git clone https://github.com/<your_username>/palettegram.git",
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 4:</span> Take a pull from the upstream
            repository to your main branch to keep it updated as per the main project repository
            <Image
              className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
              src={"/assets/contribute/pull_upstream.png"}
              width={1200}
              height={100}
              alt="pull updates"
            />
            <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
              {"git pull upstream master"}
              <Copy
                className=" absolute right-2 top-2 text-white hover:cursor-pointer"
                onClick={() => handleCopyClick("git pull upstream master")}
              />
            </pre>
          </h5>
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 5:</span> Create a new Branch
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/create_branch.png"}
            width={1200}
            height={100}
            alt="new branch"
          />
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"git branch -b <your_branch_name>"}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() => handleCopyClick("git branch -b <your_branch_name>")}
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 6:</span> install dependencies
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/install_dep.png"}
            width={1200}
            height={100}
            alt="install dependencies"
          />
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"yarn install --frozen-lockfile"}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() => handleCopyClick("yarn install --frozen-lockfile")}
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 7:</span> Stage your changes
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/stage.png"}
            width={1200}
            height={100}
            alt="save changes"
          />
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"git add ."}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() => handleCopyClick("git add .")}
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 8:</span> Commit your changes
          </h5>
          <h4 className="p-4 my-5 text-2xl md:text-3xl text-center font-extrabold tracking-wide text-black dark:text-white ">
            Make sure to visit CommitLint file{" "}
            <a
              className="underline"
              href="https://github.com/Sanchitbajaj02/palettegram/blob/master/docs/commitlint.md"
              target="_blank"
            >
              here
            </a>
          </h4>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/commit.png"}
            width={1200}
            height={100}
            alt="commit"
          />
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"git commit -m 'your commit message' "}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() => handleCopyClick("git commit -m 'your commit message' ")}
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 9:</span> Push changes to yours remote
            master/main or
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/push.png"}
            width={1200}
            height={100}
            alt="push changes"
          />
          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"git push -u origin <your_branch_name>"}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() => handleCopyClick("git push -u origin <your_branch_name>")}
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 10:</span> To create a pull request click on
            compare and pull request
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/pull_req.png"}
            width={1200}
            height={100}
            alt="pull pr"
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
          <h5 className="mt-10 mb-2  text-lg font-semibold leading-8">
            <span className="text-primary-light"> Step 11:</span> Add an appropriate title and
            description to your PR explaining changes and click on create pull request then wait for
            merge
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/commit_detail.png"}
            width={1200}
            height={100}
            alt="add detail"
          />
        </motion.div>
        <p className="p-4 my-5 text-3xl md:text-4xl text-center font-extrabold tracking-wide text-black dark:text-white ">
          Congratulations🎉, you have made a PR to the palettegram. Wait for your submission to be
          accepted and your PR to be merged by a maintainer.
        </p>
      </section>
    </div>
  );
}
