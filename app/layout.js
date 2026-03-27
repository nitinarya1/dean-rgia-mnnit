import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "RGIA - Resource Generation and International Affairs | MNNIT Allahabad",
  description: "Office of Dean, Resource Generation and International Affairs, Motilal Nehru National Institute of Technology Allahabad, Prayagraj. Fostering Global Partnerships & Resource Mobilization.",
  keywords: "RGIA, MNNIT, Allahabad, Prayagraj, Resource Generation, International Affairs, NIT, Dean, MoU, Publications, Souvenir",
  authors: [{ name: "MNNIT Allahabad" }],
  robots: "index, follow",
  openGraph: {
    title: "Dean RGIA — MNNIT Allahabad",
    description: "Office of Dean, Resource Generation and International Affairs, Motilal Nehru National Institute of Technology Allahabad, Prayagraj.",
    url: "https://dean-rgia-mnnit.vercel.app",
    siteName: "Dean RGIA — MNNIT Allahabad",
    images: [
      {
        url: "/mnnitlogo.jpg",
        width: 512,
        height: 512,
        alt: "MNNIT Allahabad Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dean RGIA — MNNIT Allahabad",
    description: "Office of Dean, Resource Generation and International Affairs, MNNIT Allahabad.",
    images: ["/mnnitlogo.jpg"],
  },
  metadataBase: new URL("https://dean-rgia-mnnit.vercel.app"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
