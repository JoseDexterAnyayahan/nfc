import { Poppins } from "next/font/google";

import Navbar from "@/components/dextap/navbar";
import Hero from "@/components/dextap/hero";
import ProductShowcase from "@/components/dextap/product-showcase";
import About from "@/components/dextap/about";
import WhatWeDo from "@/components/dextap/what-we-do";
import Contact from "@/components/dextap/contact";
import Footer from "@/components/dextap/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Home() {
  return (
    <main
      className={`${poppins.className} min-h-screen bg-white text-black dark:bg-black dark:text-white`}
    >
      <Navbar />

      <Hero />

      <ProductShowcase />

      <About />

      <WhatWeDo />

      <Contact />

      <Footer />
    </main>
  );
}