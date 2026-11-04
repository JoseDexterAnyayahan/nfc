
"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

import type { BusinessProfile } from "@/lib/profiles";
import { saveGhieContact } from "./ghieVCard";

type Props = {
  profile: BusinessProfile;
};

export default function GhieFloatingActions({ profile }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSaveContact = async () => {
    try {
      await saveGhieContact(profile);
    } catch (error) {
      console.error("Unable to save contact:", error);
      alert("Unable to save contact. Please try again.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Floating Contact Actions */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 w-full px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <nav
          aria-label="Quick contact actions"
          className="mx-auto flex w-full max-w-md items-center gap-2 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-[0_12px_45px_rgba(23,43,69,0.18)] backdrop-blur-xl"
        >
          {/* Save Contact */}
          <button
            type="button"
            onClick={handleSaveContact}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-[var(--ghie-blue)] px-2 py-3 text-white transition-all duration-200 hover:bg-[var(--ghie-blue-dark)] active:scale-[0.97]"
            aria-label="Save Ghie's contact"
          >
            <UserPlus size={20} strokeWidth={2.2} />
            <span className="text-[10px] font-semibold sm:text-xs">
              Save Contact
            </span>
          </button>

          {/* Call */}
          <a
            href={profile.phone ? `tel:${profile.phone}` : undefined}
            aria-label="Call Ghie"
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-[var(--ghie-surface)] px-2 py-3 text-[var(--ghie-blue)] transition-all duration-200 hover:bg-[var(--ghie-blue)] hover:text-white active:scale-[0.97]"
          >
            <Phone size={20} strokeWidth={2.2} />
            <span className="text-[10px] font-semibold sm:text-xs">
              Call
            </span>
          </a>

          {/* Email */}
          <a
            href={profile.email ? `mailto:${profile.email}` : undefined}
            aria-label="Email Ghie"
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-[var(--ghie-surface)] px-2 py-3 text-[var(--ghie-blue)] transition-all duration-200 hover:bg-[var(--ghie-blue)] hover:text-white active:scale-[0.97]"
          >
            <Mail size={20} strokeWidth={2.2} />
            <span className="text-[10px] font-semibold sm:text-xs">
              Email
            </span>
          </a>
        </nav>
      </div>

      {/* Back to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-28 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ghie-border)] bg-white/95 text-[var(--ghie-blue)] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--ghie-blue)] hover:text-white sm:right-6 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={19} strokeWidth={2.3} />
      </button>
    </>
  );
}
