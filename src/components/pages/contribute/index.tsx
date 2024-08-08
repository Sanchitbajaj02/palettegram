"use client";
import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { Forking, AppwriteSetup, DevSetup } from "@/components/core/contributionSections";
import { motion, useScroll, useSpring } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";

// Component to render the contribution guide with dynamic tabs
export default function Contribute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // Dynamic tab rendering based on currentTab state

  const currentTab = searchParams.get("currentTab") ?? "forkingandclone";

  const loadComponent = [
    {
      name: "forkingandclone",
      toShow: "Fork and Clone",
    },
    {
      name: "localdevelopmentsetup",
      toShow: "Local Setup",
    },
    {
      name: "appwriteSetup",
      toShow: "Appwrite setup",
    },
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    // Main render block
    <>
      <Navbar />
      <section className=" max-w-screen-lg mx-auto px-auto my-4">
        <article className="flex flex-col text-center md:flex-row justify-center gap-4">
          {loadComponent.map((compo, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  router.push(pathname + "?" + createQueryString("currentTab", compo.name));
                }}
                className={`cursor-pointer p-4 border-b-2 border-gray-600 tex-xl font-medium  ${
                  currentTab == compo.name ? `border-primary` : ""
                } `}
              >
                <p>{compo.toShow}</p>
              </motion.div>
            );
          })}
        </article>
        <article>
          <Tabs currentTab={currentTab || ""} />
          {/* <motion.div
            className="fixed bottom-0 left-0 right-0 h-2 bg-primary origin-center"
            style={{ scaleX }}
          /> */}
          <ProgressBar start={"origin-center"} />
        </article>
      </section>
      <Footer />
    </>
  );
}

const Tabs = ({ currentTab }: { currentTab: string }) => {
  switch (currentTab) {
    case "forkingandclone":
      return <Forking />;
    case "localdevelopmentsetup":
      return <DevSetup />;
    case "appwriteSetup":
      return <AppwriteSetup />;
    // Default to Forking component if currentTab does not match any case
    default:
      return <Forking />;
  }
};
