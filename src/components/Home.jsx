import { Link } from "react-router-dom";
import HeaderImage from "../Assets/header.png";
import PalettegramFor from "../Assets/palettegram_for.png";

const Home = () => {
  return (
    <>
      <nav className="py-4 shadow-md">
        <div className=" max-w-screen-xl mx-auto flex flex-row justify-between items-center">
          <Link>Logo</Link>
          <button className="px-20 py-3 text-xl rounded-full text-white bg-[#F1396D]">
            Register
          </button>
        </div>
      </nav>

      <main className="max-w-screen-xl mx-auto px-2">
        <section className="flex items-center flex-col md:flex-row gap-4 mt-20 mb-24">
          <article>
            <h1 className="text-3xl md:text-7xl font-extrabold">
              Present Palettes Around the World
            </h1>
            <p className="text-xl md:text-2xl my-8">
              Transform ideas into Beautiful Palettes, Inspire Fellow Designers.
            </p>
            <button className="px-16 py-4 text-xl rounded-full text-white bg-[#F1396D]">
              Start your journey
            </button>
          </article>
          <figure className="w-[80%] my-4">
            <img
              src={HeaderImage}
              alt="Header section"
              loading="lazy"
              width={"80%"}
              className="mx-auto"
            />
          </figure>
        </section>

        <section className="flex items-center flex-col-reverse md:flex-row gap-4 mt-24 mb-20">
          <figure className="w-full md:w-[50%]">
            <img
              src={PalettegramFor}
              alt="Who is palettegram for section"
              loading="lazy"
              width={"80%"}
              className="mx-auto"
            />
          </figure>
          <article>
            <h1 className="text-3xl md:text-6xl font-extrabold">
              Who is Palettegram for?
            </h1>
            <p className="text-xl md:text-2xl my-8">
              Anyone who wants to share their designs and color palettes to get
              the review among the professionals.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};
export default Home;
