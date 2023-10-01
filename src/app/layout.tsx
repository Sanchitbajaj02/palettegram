import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import ReduxProvider from "@/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Provider from "@/context/Provider";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://palettegram.vercel.app"),
  title: "Palettegram - from professionals by professionals",
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
    images: [
      {
        url: "/assets/meta-image.png", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Palettegram - from professionals by professionals",
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${interFont.className} scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary-light scrollbar-track-rounded-full`}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Provider>
          <ReduxProvider>{children}</ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
