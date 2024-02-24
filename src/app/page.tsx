import HomePage from "@/components/pages/home";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { cookies } from "next/headers";
import { getGithubStars } from "@/helper/getGithubStars";

export default async function Home() {
  const starCount: number = await getGithubStars();

  const cookieStore = cookies();

  const accountId = cookieStore.get("accountId")?.value;

  return (
    <>
      <Navbar starCount={starCount} />
      <HomePage accountId={accountId} />
      <Footer />
    </>
  );
}
