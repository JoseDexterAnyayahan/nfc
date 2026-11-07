import type { BusinessProfile } from "@/lib/profiles";
import { Poppins } from "next/font/google";

import Hero from "./Hero";
import About from "./About";
import Featured from "./Featured";
import Contact from "./Contact";
import CTA from "./CTA";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RbsGhie({ profile }: { profile: BusinessProfile }) {
  return (
    <main
      className={`${poppins.className} min-h-screen overflow-hidden bg-[#faf9f6] text-[#171717]`}
    >
      {/* HERO */}
      <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-8 sm:pt-8 lg:px-10 lg:pt-10">
        <Hero profile={profile} />
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:space-y-20 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <About profile={profile} />

        <Featured profile={profile} />

        <Contact profile={profile} />

        <CTA profile={profile} />
      </div>

      {/* FOOTER */}
      <Footer profile={profile} />
      <FloatingActions profile={profile} />
    </main>
  );
}
