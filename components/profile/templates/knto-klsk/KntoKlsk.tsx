"use client";

import { useCallback } from "react";
import { Poppins } from "next/font/google";
import { FaCompactDisc } from "react-icons/fa";

import type { BusinessProfile } from "@/lib/profiles";
import KntoHeader from "./KntoHeader";
import KntoFeatured from "./KntoFeatured";
import KntoHours from "./KntoHours";
import KntoLocation from "./KntoLocation";
import KntoSocials from "./KntoSocials";
import KntoFooter from "./KntoFooter";
import { kntoColors as c, kntoContainerClass } from "./knto-styles";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export default function KntoKlsk({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const handleSaveContact = useCallback(() => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCard(profile.businessName)}`,
      `ORG:${escapeVCard(profile.businessName)}`,
    ];

    if (profile.phone) {
      lines.push(`TEL;TYPE=WORK,VOICE:${profile.phone}`);
    }

    if (profile.email) {
      lines.push(`EMAIL;TYPE=WORK:${profile.email}`);
    }

    if (profile.website) {
      lines.push(`URL:${profile.website}`);
    }

    lines.push("URL:https://dextap.vercel.app/b/knto-klsk");

    if (profile.location) {
      lines.push(`ADR;TYPE=WORK:;;${escapeVCard(profile.location)};;;;`);
    }

    lines.push("END:VCARD");

    const blob = new Blob([lines.join("\r\n")], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "KNTO-KLSK.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }, [profile]);

  const handleExplore = () => {
    document.getElementById("knto-featured")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main
      className={`${poppins.className} min-h-screen overflow-hidden`}
      style={{
        backgroundColor: c.paper,
        color: c.ink,
      }}
    >
      <KntoHeader
        profile={profile}
        onSaveContact={handleSaveContact}
      />

      {/* Intro */}
      <section className={kntoContainerClass}>
        <div className="py-9 sm:py-12">
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className="hidden h-14 w-14 shrink-0 items-center justify-center border sm:flex"
              style={{
                borderColor: c.line,
                backgroundColor: c.cream,
                color: c.wood,
              }}
            >
              <FaCompactDisc size={24} />
            </div>

            <div className="max-w-2xl">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.23em]"
                style={{ color: c.wood }}
              >
                Your time, your tempo
              </p>

              <h2 className="mt-2 text-xl font-semibold leading-relaxed tracking-tight sm:text-2xl">
                Good coffee. Good company. A little music for the soul.
              </h2>

              <p
                className="mt-3 text-sm leading-7"
                style={{ color: c.muted }}
              >
                Make room for a slower moment. Explore the house, discover
                something to sip, and find your next reason to stay a little
                longer.
              </p>

              <button
                type="button"
                onClick={handleExplore}
                className="mt-5 inline-flex items-center gap-3 border-b pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:opacity-70"
                style={{
                  borderColor: c.gold,
                  color: c.espresso,
                }}
              >
                Explore featured photos
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px" style={{ backgroundColor: c.line }} />

        <KntoFeatured />

        <div className="h-px" style={{ backgroundColor: c.line }} />

        <KntoHours />

        <div className="h-px" style={{ backgroundColor: c.line }} />

        <KntoLocation
          location={
            profile.location ||
            "C57J+G7X, Osmeña, A. Bonifacio, Calapan City, Oriental Mindoro"
          }
          locationUrl={profile.locationUrl}
        />

        <div className="h-px" style={{ backgroundColor: c.line }} />

        <KntoSocials profile={profile} />
      </section>

      <KntoFooter />
    </main>
  );
}