import { ButtonLong } from "@/components/core/buttons";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";

export default function Custom404() {
  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center justify-center h-[80vh]">
        <h1 className="py-5 font-semibold text-4xl"> Error 404: Page does not Exist! </h1>
        <h2 className="mb-5 text-2xl">Please check the url again</h2>
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
