
"use client";

import { Poppins } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import type { BusinessProfile } from "@/lib/profiles";

import LitratoHeader from "./LitratoHeader";
import LitratoHighlights from "./LitratoHighlights";
import LitratoInfo from "./LitratoInfo";
import LitratoFloatingActions from "./LitratoFloatingActions";
import { litratoColors as c } from "./litrato-styles";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-litrato-poppins",
});

type Props = {
  profile: BusinessProfile;
};

export default function LitratoCafe({ profile }: Props) {
  const [showFloatingActions, setShowFloatingActions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingActions(window.scrollY > 260);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSaveContact = useCallback(() => {
    const escapeVCard = (value: string) =>
      value
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCard(profile.businessName)}`,
      `ORG:${escapeVCard(profile.businessName)}`,
      `TEL;TYPE=WORK,VOICE:${profile.phone}`,
      `EMAIL;TYPE=WORK:${profile.email}`,
    ];

    if (profile.locationUrl) {
      lines.push(`URL:${profile.locationUrl}`);
    }

    if (profile.tagline) {
      lines.push(`NOTE:${escapeVCard(profile.tagline)}`);
    }

    lines.push("END:VCARD");

    const blob = new Blob([lines.join("\r\n") + "\r\n"], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Litrato-Cafe.vcf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [profile]);

  return (
    <main
      className={`${poppins.className} min-h-screen overflow-x-clip`}
      style={{
        backgroundColor: c.background,
        color: c.text,
      }}
    >
      <LitratoHeader
        profile={profile}
        onSaveContact={handleSaveContact}
      />

      <LitratoHighlights profile={profile} />

      <LitratoInfo profile={profile} />

      <LitratoFloatingActions
        visible={showFloatingActions}
        onSaveContact={handleSaveContact}
        phone={profile.phone}
        email={profile.email}
      />

      <footer
        className="px-5 pb-28 pt-8 text-center sm:pb-10"
        style={{
          backgroundColor: c.background,
          borderTop: `1px solid ${c.border}`,
          color: c.muted,
        }}
      >
        {profile.logo && (
          <img
            src={profile.logo}
            alt={`${profile.businessName} logo`}
            className="mx-auto mb-3 h-10 w-10 rounded-full object-cover"
          />
        )}

        <p className="text-sm font-semibold tracking-[0.18em]">
          {profile.businessName.toUpperCase()}
        </p>

        {profile.tagline && (
          <p className="mt-1 text-xs">
            {profile.tagline} · EST. 2022
          </p>
        )}

        <p className="mt-4 text-xs">
          Digital business card powered by{" "}
          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4"
            style={{ color: c.sageDark }}
          >
            DexTap
          </a>
        </p>
      </footer>
    </main>
  );
}