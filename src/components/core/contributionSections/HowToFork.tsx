import Image from "next/image";
import { Copy } from "lucide-react";
import { toastify } from "@/helper/toastify";

export default function HowToFork() {
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
    <section className="relative">
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-10">
          <h4 className="p-4 my-5 text-xl md:text-3xl text-center font-bold tracking-wide text-black dark:text-white">
            If you want to download it locally then follow these steps
          </h4>

          <article className="mb-8">
            <h4 className="mb-4 text-base md:text-lg tracking-wide">
              <span className="text-primary-light">Step 1:</span> Fork the repository by clicking
              'Fork' button
            </h4>
            <Image
              className="shadow shadow-primary/50 border border-primary rounded"
              src={"/assets/contribute/fork.png"}
              width={1200}
              height={100}
              alt="fork repo"
            />
          </article>

          <article className="mb-8">
            <h4 className="mb-4 text-base md:text-lg tracking-wide">
              <span className="text-primary-light">Step 2:</span> Clone your repository by following
              the below step
            </h4>
            <Image
              className="shadow shadow-primary/50 border border-primary rounded"
              src={"/assets/contribute/clone_link.png"}
              width={1200}
              height={500}
              alt="clone link"
            />
          </article>

          <article className="mb-8">
            <h4 className="mb-4 text-base md:text-lg tracking-wide">
              <span className="text-primary-light">Step 3:</span> Copy the URL and paste it into
              your terminal
            </h4>
            <Image
              className="shadow shadow-gray-500 border-[1px] border-primary rounded-sm mt-3"
              src={"/assets/contribute/clone_cli.png"}
              width={1200}
              height={100}
              alt="cli"
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
          </article>
        </div>
        <p className="p-4 my-5 text-xl md:text-3xl text-center font-extrabold tracking-wide text-black dark:text-white ">
          Pat you back 👍, <br /> you have downloaded or cloned palettegram now start contributing.
        </p>
      </div>
    </section>
  );
}
