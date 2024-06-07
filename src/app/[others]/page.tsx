import { ButtonLong } from "@/components/core/buttons";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import NotFoundPic from "/public/assets/404.png";
import "./page.css";
import Image from "next/image";
export default function Custom404() {
  return (
    <>
      <Navbar />
      <section className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center justify-center h-[60vh] md:h-[90vh] mb-8">
          <Image
            src={NotFoundPic.src}
            alt="not found image"
            className="md:w-2/3 fluid"
            width={1200}
            height={1200}
          />
          <ButtonLong href="/" size={"big"}>
            Go Home
          </ButtonLong>
        </div>
      </section>

      <Footer />
    </>
  );
}
