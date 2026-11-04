
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  UserPlus,
  Phone,
  Mail,
  Share2,
  MapPin,
  Check,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { FaViber } from "react-icons/fa6";

import type { BusinessProfile } from "@/lib/profiles";
import { saveGhieContact } from "./ghieVCard";

export default function GhieHero({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const phone = profile.phone || "";
  const email = profile.email || "";
  const avatarSrc = profile.avatar || profile.logo;

  // Normalize Philippine mobile numbers for Viber.
  const digits = phone.replace(/\D/g, "");
  const normalizedDigits = digits.startsWith("00")
    ? digits.slice(2)
    : digits;

  const viberNumber = normalizedDigits.startsWith("63")
    ? normalizedDigits
    : normalizedDigits.startsWith("0")
      ? `63${normalizedDigits.slice(1)}`
      : normalizedDigits.length === 10 &&
          normalizedDigits.startsWith("9")
        ? `63${normalizedDigits}`
        : "";

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

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.businessName,
          text: `${profile.businessName} | ${
            profile.tagline || "Create Lasting Impacts"
          }`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Unable to share:", error);
      }
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="ghie-profile-name"
      className="relative overflow-hidden rounded-[1.75rem] border border-[var(--ghie-border)] bg-white shadow-[0_24px_70px_rgba(23,43,69,0.12)] sm:rounded-[2rem]"
    >
      
{/* Banner */}
<div className="relative isolate min-h-[220px] overflow-hidden bg-gradient-to-br from-[#064FA8] via-[var(--ghie-blue)] to-[#087C83] sm:min-h-[290px] lg:min-h-[320px]">
  {profile.banner && (
    <Image
      src={profile.banner}
      alt={`${profile.businessName} banner`}
      fill
      priority
      sizes="(max-width: 768px) 100vw, 1152px"
      className="object-cover object-center"
    />
  )}

  {/* Overlays for banner text visibility */}
  <div className="absolute inset-0 bg-[#071D38]/45" />
  <div className="absolute inset-0 bg-gradient-to-r from-[#071D38]/90 via-[#071D38]/55 to-[#071D38]/15" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#071D38]/80 via-transparent to-[#071D38]/20" />

  {/* Decorative details */}
  <div
    aria-hidden="true"
    className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/15 sm:h-80 sm:w-80"
  />

  <div
    aria-hidden="true"
    className="absolute -right-8 -top-16 h-48 w-48 rounded-full border border-[var(--ghie-gold-light)]/25 sm:h-64 sm:w-64"
  />

  {/* Banner content */}
  <div className="relative z-10 flex min-h-[220px] flex-col justify-end p-5 sm:min-h-[290px] sm:p-8 lg:min-h-[320px] lg:p-10">
    <div className="w-full max-w-2xl">
      {/* Banner badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#071D38]/65 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md sm:text-[11px] sm:tracking-[0.22em]">
        <ShieldCheck
          size={14}
          className="shrink-0 text-[var(--ghie-gold-light)]"
        />
        Community • Leadership • Service
      </div>

      {/* Banner heading */}
      <div className="mt-4 border-l-[3px] border-[var(--ghie-gold)] pl-4 sm:mt-5 sm:pl-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/95 sm:text-xs sm:tracking-[0.25em]">
          Her commitment. Her purpose.
        </p>

        <h2 className="mt-2 text-3xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
          Create Lasting
          <span className="block text-[var(--ghie-gold-light)]">
            Impacts.
          </span>
        </h2>

        <p className="mt-2 max-w-md text-[11px] leading-relaxed text-white/95 drop-shadow sm:mt-3 sm:text-sm sm:leading-7">
          Building meaningful connections and making a difference
          through community service and leadership.
        </p>
      </div>
    </div>

    {/* Location badge */}
    <div className="absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-white/20 bg-[#071D38]/60 px-3 py-2 text-[10px] font-medium text-white/95 backdrop-blur-md sm:flex sm:right-8 sm:top-8">
      <MapPin
        size={13}
        className="text-[var(--ghie-gold-light)]"
      />
      Pinamalayan, Oriental Mindoro
    </div>
  </div>
</div>


      {/* Profile details */}
      <div className="relative px-5 pb-8 sm:px-9 sm:pb-10 lg:px-12">
        <div className="relative z-10 -mt-14 flex flex-col items-center text-center sm:-mt-20">
          {/* Avatar */}
          <div className="relative h-32 w-32 shrink-0 rounded-full bg-white p-[5px] shadow-[0_15px_40px_rgba(23,43,69,0.20)] ring-1 ring-[var(--ghie-gold)]/60 sm:h-40 sm:w-40">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[var(--ghie-surface)]">
              {avatarSrc && !imageFailed ? (
                <Image
                  key={avatarSrc}
                  src={avatarSrc}
                  alt={`${profile.businessName} profile photo`}
                  fill
                  priority
                  sizes="160px"
                  className="object-cover object-center"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--ghie-blue)] to-[var(--ghie-mint-dark)] text-5xl font-bold text-white">
                  {profile.contactName?.charAt(0) ||
                    profile.businessName?.charAt(0) ||
                    "G"}
                </div>
              )}
            </div>

            {/* Gold accent / status detail */}
            <span
              aria-hidden="true"
              className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-[3px] border-white bg-green-600 shadow-sm sm:bottom-3 sm:right-3"
            />
          </div>

          {/* Name and details */}
          <div className="mt-5 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ghie-blue)] sm:text-xs">
              {profile.contactTitle || "Past President"}
            </p>

            <h1
              id="ghie-profile-name"
              className="mt-2 text-2xl font-bold leading-tight tracking-tight text-[var(--ghie-text)] sm:text-4xl lg:text-5xl"
            >
              {profile.businessName}
            </h1>

            <div className="mt-4 flex justify-center">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--ghie-border)] bg-[var(--ghie-surface)] px-3 py-2 text-[10px] font-semibold leading-5 text-[var(--ghie-blue-dark)] sm:px-4 sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--ghie-gold)]" />
                <span>Rotary Club of Pinamalayan Central</span>
              </span>
            </div>

            <p className="mt-4 text-sm font-medium italic text-[var(--ghie-muted)] sm:text-base">
              “{profile.tagline || "Create Lasting Impacts"}”
            </p>

            {profile.location && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[var(--ghie-muted)] sm:text-sm">
                <MapPin
                  size={15}
                  className="shrink-0 text-[var(--ghie-mint-dark)]"
                />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact actions */}
        <div className="mx-auto mt-8 max-w-2xl sm:mt-10">
          {/* Save Contact */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--ghie-blue)] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--ghie-blue-dark)] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={19} className="animate-spin" />
            ) : (
              <UserPlus
                size={19}
                className="transition-transform group-hover:scale-110"
              />
            )}
            {saving ? "Preparing Contact..." : "Save Contact"}
          </button>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Call */}
            <a
              href={phone ? `tel:${phone}` : undefined}
              aria-disabled={!phone}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--ghie-border)] bg-[var(--ghie-light)] px-3 py-3 text-sm font-semibold text-[var(--ghie-text)] transition-all duration-200 hover:border-[var(--ghie-blue)] hover:bg-[var(--ghie-surface)] hover:text-[var(--ghie-blue)] ${
                !phone ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <Phone
                size={16}
                className="shrink-0 text-[var(--ghie-blue)]"
              />
              Call
            </a>

            {/* Email */}
            <a
              href={email ? `mailto:${email}` : undefined}
              aria-disabled={!email}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--ghie-border)] bg-[var(--ghie-light)] px-3 py-3 text-sm font-semibold text-[var(--ghie-text)] transition-all duration-200 hover:border-[var(--ghie-blue)] hover:bg-[var(--ghie-surface)] hover:text-[var(--ghie-blue)] ${
                !email ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <Mail
                size={16}
                className="shrink-0 text-[var(--ghie-blue)]"
              />
              Email
            </a>

            {/* Viber */}
            <a
              href={
                viberNumber
                  ? `viber://chat?number=%2B${viberNumber}`
                  : undefined
              }
              aria-disabled={!viberNumber}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--ghie-border)] bg-[var(--ghie-light)] px-3 py-3 text-sm font-semibold text-[var(--ghie-text)] transition-all duration-200 hover:border-[#7360F2] hover:bg-[var(--ghie-surface)] hover:text-[#7360F2] ${
                !viberNumber ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <FaViber
                size={18}
                className="shrink-0 text-[#7360F2]"
                aria-hidden="true"
              />
              Viber
            </a>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--ghie-border)] bg-[var(--ghie-light)] px-3 py-3 text-sm font-semibold text-[var(--ghie-text)] transition-all duration-200 hover:border-[var(--ghie-gold)] hover:bg-[var(--ghie-surface)] hover:text-[var(--ghie-blue)]"
            >
              {copied ? (
                <Check
                  size={16}
                  className="shrink-0 text-[var(--ghie-mint-dark)]"
                />
              ) : (
                <Share2
                  size={16}
                  className="shrink-0 text-[var(--ghie-gold)]"
                />
              )}
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>

        {/* Gold accent */}
        <div className="mx-auto mt-9 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--ghie-gold)] to-[var(--ghie-gold-light)]" />
      </div>
    </section>
  );
}
