
"use client";

import { useEffect, useState } from "react";
import {
  ContactRound,
  Phone,
  Mail,
} from "lucide-react";
import type { BusinessProfile } from "@/lib/profiles";
import { pixeePhoneNumbers } from "@/lib/profiles/business/pixeeplates";

export default function PixeeFloatingActions({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const phoneNumber = pixeePhoneNumbers[0];

  const handleSaveContact = () => {
    // Replace this with your existing vCard save-contact logic
    // if PIXEEPLATES already has a contact download implementation.
    if (!phoneNumber) return;

    const cleanPhone = phoneNumber.replace(/[^\d+]/g, "");

    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:PIXEEPLATES",
      "ORG:PIXEEPLATES",
      `TEL;TYPE=CELL:${cleanPhone}`,
      profile.email ? `EMAIL:${profile.email}` : "",
      profile.location ? `ADR;TYPE=WORK:;;${profile.location};;;;` : "",
      `URL:${profile.socials?.find((s) => s.platform === "facebook")?.url || ""}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\r\n");

    const blob = new Blob([vCard], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "PIXEEPLATES.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-5 z-[90] flex justify-center px-4 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="flex w-full max-w-[390px] items-center gap-2 rounded-full border border-[#c9a45c]/30 bg-[#111111]/95 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">

        {/* SAVE CONTACT */}
        <button
          type="button"
          onClick={handleSaveContact}
          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#d6b56d] px-4 py-3 text-xs font-bold text-black transition hover:bg-[#e4c982] active:scale-[0.97]"
        >
          <ContactRound size={17} />
          <span className="whitespace-nowrap">
            Save Contact
          </span>
        </button>

        {/* CALL */}
        {phoneNumber && (
          <a
            href={`tel:${phoneNumber}`}
            aria-label="Call PIXEEPLATES"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#e4c982] transition hover:border-[#c9a45c]/50 hover:bg-[#c9a45c]/15 active:scale-95"
          >
            <Phone size={18} />
          </a>
        )}

        {/* EMAIL */}
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email PIXEEPLATES"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#e4c982] transition hover:border-[#c9a45c]/50 hover:bg-[#c9a45c]/15 active:scale-95"
          >
            <Mail size={18} />
          </a>
        )}
      </div>
    </div>
  );
}
