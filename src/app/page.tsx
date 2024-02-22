import HomePage from "@/components/pages/home";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";

import { getGithubStars } from "@/helper/getGithubStars";

export default async function Home() {
  const starCount: number = await getGithubStars();

  return (
    <>
      <Navbar starCount={starCount} />
      <HomePage />
      <Footer />
    </>
  );
}
