
"use client";

import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaRegAddressCard,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";

type Props = {
  profile: BusinessProfile;
  onSaveContact: () => void | Promise<void>;
};

export default function TamtechFloatingActions({
  profile,
  onSaveContact,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > 260);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  const phone = profile.phone?.replace(/[^\d+]/g, "") ?? "";

  return (
    <div
      aria-hidden={!visible}
      className={[
        "fixed inset-x-0 bottom-0 z-[9999] px-4 pt-3",
        "pb-[calc(env(safe-area-inset-bottom,0px)+12px)]",
        "transition-[opacity,transform] duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-2xl border border-[#E1EAF4] bg-white/95 p-2.5 shadow-[0_8px_35px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <button
          type="button"
          onClick={onSaveContact}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0874E8] px-3 text-sm font-bold text-white transition hover:bg-[#0558B5] active:scale-[0.98]"
        >
          <FaRegAddressCard size={16} />
          <span>Save Contact</span>
        </button>

        <a
          href={phone ? `tel:${phone}` : undefined}
          aria-label="Call Wendell Lozano"
          tabIndex={visible ? 0 : -1}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0874E8]/10 text-[#0874E8]"
        >
          <FaPhoneAlt size={16} />
        </a>

        <a
          href={profile.email ? `mailto:${profile.email}` : undefined}
          aria-label="Email Wendell Lozano"
          tabIndex={visible ? 0 : -1}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#42CDA5]/20 text-[#168D6B]"
        >
          <FaEnvelope size={16} />
        </a>
      </div>
    </div>
  );
}
