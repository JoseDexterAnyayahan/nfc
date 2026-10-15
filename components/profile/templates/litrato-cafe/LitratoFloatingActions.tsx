"use client";

import { FaUserPlus, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import { litratoColors as c } from "./litrato-styles";

type Props = {
  visible: boolean;
  onSaveContact: () => void;
  phone: string;
  email: string;
};

export default function LitratoFloatingActions({
  visible,
  onSaveContact,
  phone,
  email,
}: Props) {
  const tab = visible ? 0 : -1;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(14px,env(safe-area-inset-bottom))] transition-all duration-300 ease-out sm:px-5 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="mx-auto flex max-w-md items-center gap-2.5 rounded-full border p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur-md"
        style={{
          backgroundColor: c.surface,
          borderColor: c.border,
        }}
      >
        {/* Primary action */}
        <button
          type="button"
          onClick={onSaveContact}
          tabIndex={tab}
          className="group flex h-14 flex-1 items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold tracking-wide shadow-md transition duration-200 hover:brightness-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] sm:text-base"
          style={{
            backgroundColor: c.sageDark,
            color: "#FFFFFF",
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
            <FaUserPlus className="text-sm" />
          </span>
          <span>Save Contact</span>
        </button>

        {/* Secondary actions: icon only */}
        <a
          href={`tel:${phone}`}
          tabIndex={tab}
          aria-label="Call"
          title="Call"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-lg transition duration-200 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-90"
          style={{ color: c.text, borderColor: c.border }}
        >
          <FaPhoneAlt />
        </a>

        <a
          href={`mailto:${email}`}
          tabIndex={tab}
          aria-label="Email"
          title="Email"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-lg transition duration-200 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-90"
          style={{ color: c.text, borderColor: c.border }}
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
}
