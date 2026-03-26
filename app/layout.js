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
  description: "Office of Dean, Resource Generation and International Affairs, Motilal Nehru National Institute of Technology Allahabad, Prayagraj",
  keywords: "RGIA, MNNIT, Allahabad, Prayagraj, Resource Generation, International Affairs, NIT",
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
