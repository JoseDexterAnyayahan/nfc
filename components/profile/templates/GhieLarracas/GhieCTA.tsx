
"use client";

import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  UserPlus,
  HeartHandshake,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import type { BusinessProfile } from "@/lib/profiles";
import { saveGhieContact } from "./ghieVCard";

export default function GhieCTA({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveGhieContact(profile);
    } catch (error) {
      console.error("Unable to save contact:", error);
      alert("Unable to save contact. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-14 sm:px-7 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">

        {/* Main CTA Card */}
        <div className="group relative isolate overflow-hidden rounded-[2rem] bg-[var(--ghie-blue-dark)] shadow-[0_25px_70px_rgba(7,29,56,0.18)] sm:rounded-[2.5rem]">

          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/[0.08]" />

            <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-white/[0.08]" />

            <div className="absolute -right-4 -top-12 h-48 w-48 rounded-full border border-white/[0.08]" />

            <div className="absolute -bottom-40 -left-28 h-96 w-96 rounded-full border-[45px] border-white/[0.035]" />

            <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--ghie-blue)] opacity-20 blur-[100px]" />

            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[var(--ghie-mint)] opacity-[0.08] blur-[90px]" />
          </div>

          {/* CTA Content */}
          <div className="relative z-10 px-6 py-12 text-center sm:px-12 sm:py-16 lg:px-20 lg:py-20">

            {/* Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E4C982]/30 bg-white/[0.07] px-4 py-2 backdrop-blur-sm">
              <HeartHandshake
                size={15}
                className="text-[#E4C982]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E4C982] sm:text-xs">
                Let's Connect
              </span>
            </div>

            {/* Heading */}
            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let's Create

              <span className="mt-1 block text-[#E4C982]">
                Lasting Impacts.
              </span>
            </h2>

            {/* Decorative divider */}
            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="h-[2px] w-10 rounded-full bg-white/25" />

              <Sparkles
                size={15}
                className="text-[#E4C982]"
              />

              <span className="h-[2px] w-10 rounded-full bg-white/25" />
            </div>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              Whether you want to connect, share an idea, or
              explore opportunities to help the community,
              Ghie would be glad to hear from you.
              Together, we can turn meaningful connections
              into lasting impacts.
            </p>

            {/* Main actions */}
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">

              {/* Save Contact */}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="group/button inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[var(--ghie-blue-dark)] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F0F7FF] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4C982] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ghie-blue-dark)]"
              >
                {saving ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <UserPlus
                    size={18}
                    className="transition-transform group-hover/button:scale-110"
                  />
                )}

                {saving
                  ? "Preparing Contact..."
                  : "Save Ghie's Contact"}
              </button>

              {/* Email */}
              <a
                href={
                  profile.email
                    ? `mailto:${profile.email}`
                    : "#contact"
                }
                aria-disabled={!profile.email}
                className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/[0.06] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4C982] ${
                  !profile.email
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                <Mail size={17} />

                Send an Email

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Contact Information */}
            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 border-t border-white/15 pt-7 sm:flex-row sm:gap-8">

              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="group/contact inline-flex min-w-0 items-center gap-3 text-left transition-colors hover:text-[#E4C982]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[#E4C982] transition-colors group-hover/contact:bg-white/10">
                    <Phone size={16} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                      Call or Text
                    </span>

                    <span className="mt-0.5 block text-sm font-semibold text-white">
                      {profile.phone}
                    </span>
                  </span>
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="group/contact inline-flex min-w-0 items-center gap-3 text-left transition-colors hover:text-[#E4C982]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[#E4C982] transition-colors group-hover/contact:bg-white/10">
                    <Mail size={16} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                      Email Address
                    </span>

                    <span className="mt-0.5 block max-w-[220px] truncate text-sm font-semibold text-white">
                      {profile.email}
                    </span>
                  </span>
                </a>
              )}
            </div>

            {/* Closing message */}
            <div className="mt-9">
              <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                <span className="h-1 w-1 rounded-full bg-[var(--ghie-mint)]" />

                Compassion in Action

                <span className="text-[#E4C982]/50">•</span>

                Connections That Matter
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
