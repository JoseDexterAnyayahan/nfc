"use client";

import { useEffect, useState } from "react";
import { FaDownload, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import { FaUserPlus } from "react-icons/fa6";

type Props = {
  profile: BusinessProfile;
  onSaveContact: () => void;
};

export default function SuzukiFloatingActions({
  profile,
  onSaveContact,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 260);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const phone = profile.phone.replace(/[^\d+]/g, "");

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex w-full max-w-md items-center gap-2.5 rounded-2xl border border-[var(--suzuki-border)] bg-[var(--suzuki-card)]/95 p-2.5 shadow-[0_8px_35px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        {/* Main Save Contact button */}
        <button
          type="button"
          onClick={onSaveContact}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-[var(--suzuki-blue)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--suzuki-blue-hover)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--suzuki-blue)] focus-visible:ring-offset-2"
        >
          <FaUserPlus size={15} />
          <span>Save Contact</span>
        </button>

        {/* Call button */}
        <a
          href={`tel:${phone}`}
          aria-label="Call Jhon Loyd Caganan"
          tabIndex={visible ? 0 : -1}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--suzuki-border)] bg-[var(--suzuki-surface)] text-[var(--suzuki-blue)] transition hover:border-[var(--suzuki-blue)] hover:bg-[var(--suzuki-blue)]/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--suzuki-blue)]"
        >
          <FaPhoneAlt size={17} />
        </a>

        {/* Email button */}
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email Jhon Loyd Caganan"
          tabIndex={visible ? 0 : -1}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--suzuki-border)] bg-[var(--suzuki-surface)] text-[var(--suzuki-text)] transition hover:border-[var(--suzuki-red)] hover:bg-[var(--suzuki-red)]/10 hover:text-[var(--suzuki-red)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--suzuki-red)]"
        >
          <FaEnvelope size={17} />
          <span className="absolute bottom-0 right-0 h-1 w-4 rounded-tl" />
        </a>
      </div>
    </div>
  );
}
