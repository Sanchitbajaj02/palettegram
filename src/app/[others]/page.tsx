import { ButtonLong } from "@/components/core/buttons";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import NotFoundPic from "/public/assets/404.png";
import './page.css';

export default function Custom404() {
  return (
    <>
      <Navbar />
      <section className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <img src={NotFoundPic.src} alt="not found image" className="w-2/3 fluid" />
          <ButtonLong href="/" children={"Go Home"} size={"big"}/>
        </div>
      </section>
        <br />
        <br />
        <br />
      <Footer/>
    </>
  );
}
