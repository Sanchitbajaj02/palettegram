import { ButtonLong } from "@/components/core/buttons";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";

export default function Custom404() {
  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center justify-center h-[80vh]">
        <h1 className=" py-5 font-bold text-2xl"> Error 404: Page does'nt Exist! </h1>
        <p className=" font-semibold mb-5">Please check the url again</p>
        <ButtonLong href="/" size="big">
          Get Back To Home
        </ButtonLong>
        <div></div>

        <div className=" bottom-0 fixed w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
