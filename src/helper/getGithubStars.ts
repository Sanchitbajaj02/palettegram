export async function getGithubStars(): Promise<number> {
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
