import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Copy } from "react-feather";
import { toastify } from "@/helper/toastify";

export default function HowToFork() {
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
      toastify(`Eh! some problem has occured ${error}`, "error");
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
            If you want to download it locally then follow these steps
          </h4>
          <h5 className="my-4 text-lg font-semibold">
            {" "}
            <span className="text-primary-light"> Step 1:</span> Fork this repository
          </h5>
          <Image
            className="shadow shadow-gray-500  border-[1px] border-primary rounded-sm"
            src={"/assets/contribute/fork.png"}
            width={1200}
            height={100}
            alt="settings"
          />
        </div>
        <div className="my-2">
          <h5 className="my-4 text-lg font-semibold">
            <span className="text-primary-light"> Step 2:</span> Clone this repository
          </h5>
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-lg"
            src={"/assets/contribute/clone_link.png"}
            width={1200}
            height={500}
            alt="settings"
          />
          <Image
            className="shadow shadow-gray-500 border-[1px] border-primary rounded-sm mt-3"
            src={"/assets/contribute/clone_cli.png"}
            width={1200}
            height={100}
            alt="settings"
          />

          <pre className="block relative overflow-x-auto bg-gray-900 text-white py-4 px-2 mt-3">
            {"git clone https://github.com/<your_username>/palettegram.git"}
            <Copy
              className=" absolute right-2 top-2 text-white hover:cursor-pointer"
              onClick={() =>
                handleCopyClick("git clone https://github.com/<your_username>/palettegram.git")
              }
            />
          </pre>
        </div>

        <p className="p-4 my-5 text-3xl md:text-4xl text-center font-extrabold tracking-wide text-black dark:text-white ">
          Pat you back 👍, you have downloaded or cloned palettegram now start contributing.
        </p>
      </section>
    </div>
  );
}
