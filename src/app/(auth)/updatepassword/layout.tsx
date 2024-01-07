import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UpdatePassword | Palettegram - from professionals by professionals",
  description:
    "Palletegrm is a social media application dedicated to professionals like graphic designers, UI designers, UX designers, Developers, etc. to post and their color palletes as well as use other's color palletes.",

  keywords:
    "Palettegram, Appwrite, Color Designer, Palettegram social media, behance, dribbble, made for designers",

  alternates: {
    canonical: "https://palettegram.vercel.app/updatepassword",
  },
};

export default function UpdatePasswordLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
