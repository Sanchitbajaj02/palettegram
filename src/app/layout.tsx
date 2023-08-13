import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";

const poppinFont = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palettegram - professionals by professionals",
  description:
    "Palletegrm is a social media application dedicated to professionals like graphic designers, UI designers, UX designers, Developers, etc. to post and their color palletes as well as use other's color palletes.",

  keywords:
    "Palettegram, Appwrite, Color Designer, Palettegram social media, behance, dribbble, made for designers",

  alternates: {
    canonical: "https://palettegram.vercel.app",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://palettegram.vercel.app",
    siteName: "Palettegram - professionals by professionals",
    title: "Palettegram - professionals by professionals",
    description:
      "Palletegrm is a social media application dedicated to professionals like graphic designers, UI designers, UX designers, Developers, etc. to post and their color palletes as well as use other's color palletes.",
    // images: [
    //   {
    //     url: "https://mentoravinash.in/images/og-image.jpg", // Replace with your actual OG image URL
    //     width: 1200,
    //     height: 630,
    //     alt: "Avinash Sharma - Career Mentor",
    //   },
    // ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppinFont.className}>{children}</body>
    </html>
  );
}
