import { ButtonLong } from "@/components/core/buttons";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";

export default function Custom404() {
  return (
    <>
      <Navbar />

      <section className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center justify-center h-[64vh]">
          <h1 className="my-4 font-semibold text-4xl tracking-wide">
            Error 404: Page does not Exist!
          </h1>
          <h2 className="my-4 text-2xl">Please check the url again</h2>
          <ButtonLong href="/" size="big">
            Get Back To Home
          </ButtonLong>
        </div>
      </section>

      <Footer />
    </>
  );
}
