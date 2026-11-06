import type { BusinessProfile } from "@/lib/profiles";
import { FaAddressBook, FaEnvelope, FaPhone } from "react-icons/fa6";

type Props = {
  profile: BusinessProfile;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B779] focus-visible:ring-offset-2 focus-visible:ring-offset-[#56463A]";

const actionBase =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-none border px-6 text-sm font-semibold tracking-wide transition duration-300 active:scale-[0.98] sm:w-auto sm:px-7";

const primaryAction = `${actionBase} border-[#D6B779] bg-gradient-to-r from-[#B89553] via-[#E5CD91] to-[#B89553] text-[#21190F] shadow-[0_4px_20px_rgba(214,183,121,0.15)] hover:brightness-110 hover:shadow-[0_6px_25px_rgba(214,183,121,0.25)]`;

const secondaryAction = `${actionBase} border-[#D6B779]/50 bg-[#D6B779]/5 text-[#E5CD91] hover:border-[#E5CD91] hover:bg-[#D6B779]/15`;

export default function CTA({ profile }: Props) {
  const phone = profile.phone?.trim() ?? "";
  const email = profile.email?.trim() ?? "";

  const digits = phone.replace(/\D/g, "");

  const internationalPhone = digits.startsWith("0")
    ? `63${digits.slice(1)}`
    : digits;

  const contactName = profile.contactName?.trim() || profile.businessName;

  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${contactName}`,
    `ORG:${profile.businessName}`,
    ...(internationalPhone ? [`TEL;TYPE=CELL:+${internationalPhone}`] : []),
    ...(email ? [`EMAIL:${email}`] : []),
    "END:VCARD",
  ].join("\r\n");

  const contactFile = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`;

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#56463A] px-5 py-16 text-center sm:py-20 md:px-10 md:py-24"
    >
      {/* Decorative golden frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-[#D6B779]/20 sm:inset-5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D6B779]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-[#B89553]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D6B779]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E5CD91] sm:text-xs sm:tracking-[0.35em]">
            Let's create something memorable
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D6B779]" />
        </div>

        <h2
          id="cta-heading"
          className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Your Moments Deserve to Be{" "}
          <span className="bg-gradient-to-r from-[#B89553] via-[#F0DDA8] to-[#B89553] bg-clip-text text-transparent">
            Remembered.
          </span>
        </h2>

        <div
          aria-hidden="true"
          className="mx-auto mt-7 flex items-center justify-center gap-2"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89553]" />
          <span className="h-2 w-2 rotate-45 border border-[#E5CD91] bg-[#B89553]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89553]" />
        </div>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-[#E5D9C8]/80">
          Let us be part of your special occasion. Get in touch with us to
          discuss your photography and videography needs.
        </p>

        <div className="mx-auto mt-10 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={contactFile}
            download={`${profile.businessName.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.vcf`}
            className={`${primaryAction} ${focusRing}`}
          >
            <FaAddressBook aria-hidden="true" size={17} />
            Save Contact
          </a>

          {digits && (
            <a
              href={`tel:+${internationalPhone}`}
              className={`${secondaryAction} ${focusRing}`}
            >
              <FaPhone aria-hidden="true" size={14} />
              Call Now
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className={`${secondaryAction} ${focusRing}`}
            >
              <FaEnvelope aria-hidden="true" size={14} />
              Send an Email
            </a>
          )}
        </div>

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D6B779]/50">
          CALIX FILMS AND PHOTOGRAPHY
        </p>
      </div>
    </section>
  );
}