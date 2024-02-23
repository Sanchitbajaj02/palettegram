"use client";
import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { Forking, AppwriteSetup, DevSetup } from "@/components/core/contributionSections";

// Component to render the contribution guide with dynamic tabs
export default function Contribute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // Dynamic tab rendering based on currentTab state

  const currentTab = searchParams.get("currentTab");

  const loadComponent = [
    {
      name: "forkingandclone",
      toShow: "How to Fork and Clone",
    },
    {
      name: "localdevelopmentsetup",
      toShow: "How to setup locally",
    },
    {
      name: "appwriteSetup",
      toShow: "How to do Appwrite setup",
    },
  ];

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
      <div className="mx-10 my-3">
        <section className="flex flex-row  whitespace-normal overflow-auto md: justify-center max-w-screen-lg mx-auto px-auto ">
          <AnimatePresence>
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
                  className={`cursor-pointer px-2 py-3 border-b-[1px] border-gray-800  ${
                    currentTab == compo.name ? `border-b-4 border-primary` : ""
                  } `}
                >
                  <p>{compo.toShow}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>
        <section>
          <Tabs currentTab={currentTab || ""} />
        </section>
      </div>
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
