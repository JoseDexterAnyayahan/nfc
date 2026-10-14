
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
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export default function KntoKlsk({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const handleSaveContact = useCallback(async () => {
    const businessName = profile.businessName || "KNTO KLSK";
    const phone = profile.phone || "0966 401 4224";
    const email = profile.email || "kntoklsk@gmail.com";
    const address =
      profile.location ||
      "2nd Floor, Osmeña cor. Bonifacio St., Ilaya, Calapan City 5200, Calapan, Philippines";

    const profileUrl = "https://dextap.vercel.app/b/knto-klsk";

    const socials = [
      {
        platform: "Instagram",
        url:
          profile.socials?.find(
            (social) => social.platform === "instagram",
          )?.url || "https://www.instagram.com/kntoklsk/",
      },
      {
        platform: "Facebook",
        url:
          profile.socials?.find(
            (social) => social.platform === "facebook",
          )?.url || "https://www.facebook.com/KntoKlsk/",
      },
      {
        platform: "TikTok",
        url:
          profile.socials?.find(
            (social) => social.platform === "tiktok",
          )?.url || "https://www.tiktok.com/@knto.klsk",
      },
    ];

    const notes = [
      profile.tagline || "DROP THE NEEDLE. SIP THE MOMENTS.",
      "Sunday to Thursday: 11:00 AM - 10:00 PM",
      "Last order: 9:20 PM",
      "Friday and Saturday: 11:00 AM - 11:00 PM",
      "Last order: 10:20 PM",
    ].join("\n");

    // Fetch the KNTO KLSK logo from the public folder.
    let photoLine: string | undefined;

    try {
      const response = await fetch(
        "/profiles/business/knto-klsk/knto-logo.jpg",
      );

      if (response.ok) {
        const imageBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(imageBuffer);

        // Convert the JPEG image to Base64 safely.
        let binary = "";

        for (let i = 0; i < bytes.length; i += 0x8000) {
          binary += String.fromCharCode(
            ...bytes.subarray(i, i + 0x8000),
          );
        }

        const base64 = btoa(binary);

        // vCard 3.0 embedded contact photo.
        photoLine = `PHOTO;ENCODING=b;TYPE=JPEG:${base64}`;
      }
    } catch (error) {
      console.error("Could not load the KNTO KLSK logo:", error);
    }

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCard(businessName)}`,
      `ORG:${escapeVCard(businessName)}`,
      `TEL;TYPE=WORK,VOICE:${phone}`,
      `EMAIL;TYPE=WORK:${email}`,
      `URL:${profileUrl}`,
      `ADR;TYPE=WORK:;;${escapeVCard(address)};;;;`,
      `NOTE:${escapeVCard(notes)}`,
      ...socials.map(
        (social) =>
          `X-SOCIALPROFILE;TYPE=${social.platform.toLowerCase()}:${social.url}`,
      ),
    ];

    // Fold the Base64 photo line to comply with vCard line-length rules.
    if (photoLine) {
      const chunks = photoLine.match(/.{1,75}/g) || [];

      lines.push(
        chunks
          .map((chunk, index) => (index === 0 ? chunk : ` ${chunk}`))
          .join("\r\n"),
      );
    }

    lines.push("END:VCARD");

    const blob = new Blob([lines.join("\r\n") + "\r\n"], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "KNTO-KLSK.vcf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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