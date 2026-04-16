import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "Dean RGIA — MNNIT Allahabad",
    template: "%s | Dean RGIA — MNNIT Allahabad",
  },
  description: "Office of Dean, Resource Generation and International Affairs, Motilal Nehru National Institute of Technology Allahabad, Prayagraj. Fostering Global Partnerships & Resource Mobilization.",
  keywords: "RGIA, MNNIT, Allahabad, Prayagraj, Resource Generation, International Affairs, NIT, Dean, MoU, Publications, Souvenir, Motilal Nehru",
  authors: [{ name: "MNNIT Allahabad", url: "https://mnnit.ac.in" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://dean-rgia-mnnit.vercel.app" },
  openGraph: {
    title: "Dean RGIA — MNNIT Allahabad",
    description: "Office of Dean, Resource Generation and International Affairs, Motilal Nehru National Institute of Technology Allahabad, Prayagraj.",
    url: "https://dean-rgia-mnnit.vercel.app",
    siteName: "Dean RGIA — MNNIT Allahabad",
    images: [
      {
        url: "/mnnitlogo.jpg",
        width: 1200,
        height: 630,
        alt: "Dean RGIA — MNNIT Allahabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dean RGIA — MNNIT Allahabad",
    description: "Office of Dean, Resource Generation and International Affairs, MNNIT Allahabad.",
    images: ["/mnnitlogo.jpg"],
  },
  metadataBase: new URL("https://dean-rgia-mnnit.vercel.app"),
  verification: {
    google: "add-your-google-search-console-token-here",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Dean, Resource Generation and International Affairs — MNNIT Allahabad",
  "alternateName": "Dean RGIA",
  "url": "https://dean-rgia-mnnit.vercel.app",
  "logo": "https://dean-rgia-mnnit.vercel.app/mnnitlogo.jpg",
  "description": "Office of Dean, Resource Generation and International Affairs at Motilal Nehru National Institute of Technology Allahabad, Prayagraj.",
  "parentOrganization": {
    "@type": "CollegeOrUniversity",
    "name": "Motilal Nehru National Institute of Technology Allahabad",
    "url": "https://mnnit.ac.in"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Motilal Nehru National Institute of Technology Allahabad",
    "addressLocality": "Prayagraj",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "211004",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-532-2271040",
    "contactType": "customer service",
    "email": "rgia@mnnit.ac.in"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <style>{`
          @media print {
            nav, footer, button, .no-print { display: none !important; }
            body { background: white !important; color: black !important; }
            a { color: black !important; text-decoration: underline; }
            .glass-card { box-shadow: none !important; border: 1px solid #ccc !important; }
          }
        `}</style>
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {/* Skip to content: accessibility for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-teal-700 focus:text-white focus:rounded-lg focus:font-bold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
