import HomePage from "@/components/pages/home";
import Footer from "@/components/core/footer";

async function getGithubStars(): Promise<number> {
  try {
    const githubApiData = await fetch("https://api.github.com/repos/sanchitbajaj02/palettegram");
    if (!githubApiData.ok) {
      throw new Error("Not fetching data from API");
    }

    const data = await githubApiData.json();

    return data.stargazers_count;
  } catch (error) {
    console.log(error);
  }
  return 0;
}

export default async function Home() {
  const starCount: number = await getGithubStars();

  return (
    <>
      <HomePage starCount={starCount} />
      <Footer />
    </>
  );
}
