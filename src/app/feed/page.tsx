import Feed from "@/components/pages/feed";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";

export default async function FeedComponent() {
  return (
    <>
      <Navbar />
      <Feed />
      <Footer />
    </>
  );
}
