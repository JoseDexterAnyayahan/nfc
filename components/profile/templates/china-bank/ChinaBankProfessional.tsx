"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import type { BusinessProfile } from "@/lib/profiles";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Copy,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Moon,
  Navigation,
  Phone,
  PiggyBank,
  Share2,
  ShieldCheck,
  Sun,
  UserPlus,
  Wallet,
} from "lucide-react";

import { FaFacebookF } from "react-icons/fa6";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  profile: BusinessProfile;
};

const AUGURI_URL = "https://dextap.vercel.app/b/auguri";

const DEFAULT_BRANCH = "China Bank Savings Calapan Branch";

/*
 * =============================================================
 * SERVICES
 * -------------------------------------------------------------
 * Edit these freely. The copy is intentionally general — swap in
 * the exact products and wording you want to promote.
 * =============================================================
 */

const SERVICES = [
  {
    icon: Landmark,
    title: "Business Banking",
    description: "Accounts and support for growing local businesses.",
  },
  {
    icon: Wallet,
    title: "Loans & Financing",
    description: "Talk through financing options that fit your goals.",
  },
  {
    icon: PiggyBank,
    title: "Savings & Deposits",
    description: "Save with confidence using accounts suited to your needs.",
  },
  {
    icon: ShieldCheck,
    title: "Client Guidance",
    description:
      "Straightforward advice on choosing the right account or loan.",
  },
];

/*
 * =============================================================
 * COLORS
 * -------------------------------------------------------------
 * Every value is a CSS variable, declared in the <style> block at
 * the top of the component (light on :root, dark under .dark — the
 * class next-themes puts on the document root before hydration).
 * The browser paints the right theme on the first frame, so there
 * is no light-mode flash on refresh.
 * =============================================================
 */

const colors = {
  page: "var(--cb-page)",
  card: "var(--cb-card)",
  cardSoft: "var(--cb-card-soft)",
  text: "var(--cb-text)",
  muted: "var(--cb-muted)",
  border: "var(--cb-border)",
  red: "var(--cb-red)",
  redText: "var(--cb-red-text)",
  yellow: "var(--cb-yellow)",
  yellowSoft: "var(--cb-yellow-soft)",
  headerBg: "var(--cb-header-bg)",
  barBg: "var(--cb-bar-bg)",
};

/*
 * =============================================================
 * HELPERS
 * =============================================================
 */

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Display only — the tel: link still uses the raw digits.
function formatPhoneDisplay(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("09")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return value;
}

async function imageToBase64(
  imageUrl: string,
): Promise<{ base64: string; mimeType: string } | null> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to load image: ${response.status}`);
    }

    const blob = await response.blob();
    const mimeType = blob.type || "image/jpeg";

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          reject(new Error("Unable to convert image"));
          return;
        }

        const commaIndex = result.indexOf(",");

        if (commaIndex === -1) {
          reject(new Error("Invalid image data"));
          return;
        }

        resolve(result.substring(commaIndex + 1));
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image"));
      };

      reader.readAsDataURL(blob);
    });

    return { base64, mimeType };
  } catch (error) {
    console.error("Unable to load profile avatar:", error);
    return null;
  }
}

/*
 * =============================================================
 * CONTACT ROW
 * The main area is the link; the copy button sits beside it (a
 * button can't live inside an anchor).
 * =============================================================
 */

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  filledIcon?: boolean;
  onCopy?: () => void;
};

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
  filledIcon,
  onCopy,
}: ContactRowProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-2xl border pr-2 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="cb-focus flex min-w-0 flex-1 items-center gap-4 rounded-2xl px-4 py-3.5"
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={
            filledIcon
              ? { backgroundColor: colors.red, color: "#ffffff" }
              : { backgroundColor: colors.yellowSoft, color: colors.redText }
          }
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: colors.muted }}
          >
            {label}
          </p>

          <p className="mt-1 truncate text-[13px] font-medium">{value}</p>
        </div>

        <ArrowUpRight size={15} style={{ color: colors.muted }} />
      </a>

      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="cb-focus flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.cardSoft,
            color: colors.muted,
          }}
        >
          <Copy size={14} />
        </button>
      )}
    </div>
  );
}

/*
 * =============================================================
 * MAIN TEMPLATE
 * =============================================================
 */

export default function ChinaBankProfessional({ profile }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  // Only needed for the Sun/Moon icon itself (real content, not color).
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showBar, setShowBar] = useState(false);

  const heroActionsRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * The floating action bar stays hidden until the hero actions
   * have scrolled out of view above the viewport — so it never
   * duplicates buttons that are already on screen.
   */
  useEffect(() => {
    const node = heroActionsRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);

    if (toastTimer.current) window.clearTimeout(toastTimer.current);

    toastTimer.current = window.setTimeout(() => {
      setToast(null);
    }, 2200);
  };

  /*
   * =========================================================
   * PROFILE DATA
   * =========================================================
   */

  const businessName = profile.businessName || DEFAULT_BRANCH;

  const contactName = profile.contactName || "Gio Manalo";

  const contactTitle = profile.contactTitle || "Business Manager";

  const phone = profile.phone || "09399796582";

  const email = profile.email || "eamanalo.cbs@chinabank.ph";

  const banner =
    profile.banner || "/profiles/business/china-bank-savings/banner.jpg";

  const avatar =
    profile.avatar || "/profiles/business/china-bank-savings/gio.jpg";

  const facebook =
    profile.socials?.find((social) => social.platform === "facebook")?.url ||
    "https://www.facebook.com/search/top?q=Leige%20Manalo";

  const location = profile.location || DEFAULT_BRANCH;

  const phoneHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  const mapQuery =
    profile.location ||
    `${businessName}, Calapan City, Oriental Mindoro, Philippines`;

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery,
  )}&output=embed`;

  const directionsUrl =
    profile.locationUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      mapQuery,
    )}`;

  const addressLine =
    profile.location && profile.location !== businessName
      ? profile.location
      : "Calapan City, Oriental Mindoro";

  /*
   * =========================================================
   * ACTIONS
   * =========================================================
   */

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied`);
      return true;
    } catch {
      showToast("Couldn't copy — please try again");
      return false;
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: contactName,
          text: `${contactName} — ${contactTitle}`,
          url,
        });

        return;
      }
    } catch (error) {
      // The visitor closed the share sheet — nothing to do.
      if ((error as DOMException)?.name === "AbortError") return;
    }

    await copyText(url, "Profile link");
  };

  const handleSaveContact = async () => {
    try {
      const nameParts = contactName.split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const profileUrl = "https://dextap.vercel.app/b/gio-manalo";

      const avatarData = avatar ? await imageToBase64(avatar) : null;

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",

        `FN:${escapeVCardValue(contactName)}`,

        `N:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`,

        `ORG:${escapeVCardValue(businessName)}`,

        `TITLE:${escapeVCardValue(contactTitle)}`,

        `TEL;TYPE=CELL:${escapeVCardValue(phone)}`,

        `EMAIL;TYPE=INTERNET:${escapeVCardValue(email)}`,

        `URL:${profileUrl}`,

        "NOTE:Other Business - Auguri",
      ];

      if (location) {
        lines.push(`ADR;TYPE=WORK:;;${escapeVCardValue(location)};;;;`);
      }

      if (avatarData) {
        const imageType = avatarData.mimeType.toLowerCase().includes("png")
          ? "PNG"
          : "JPEG";

        lines.push(`PHOTO;ENCODING=b;TYPE=${imageType}:${avatarData.base64}`);
      }

      lines.push("END:VCARD");

      const blob = new Blob([lines.join("\r\n")], {
        type: "text/vcard;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${contactName
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}.vcf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error("Failed to create contact:", error);

      alert("Unable to save the contact. Please try again.");
    }
  };

  /*
   * =========================================================
   * SHARED CLASSES
   * =========================================================
   */

  const actionClass = `
    cb-focus flex h-11 w-11 shrink-0 items-center justify-center
    rounded-full border transition-all duration-200
    hover:-translate-y-0.5
  `;

  const primaryButtonClass = `
    cb-focus cb-sheen relative flex h-[52px] w-full items-center
    justify-center gap-2.5 overflow-hidden rounded-2xl text-[13px]
    font-semibold text-white transition-all duration-200
    hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80
  `;

  const secondaryButtonClass = `
    cb-focus flex h-12 items-center justify-center gap-2 rounded-2xl
    border text-[13px] font-semibold transition-all duration-200
    hover:-translate-y-0.5
  `;

  const eyebrowClass = "text-[10px] font-semibold uppercase tracking-[0.24em]";

  const saveLabel = saving ? "Preparing…" : "Save Contact";

  const saveIcon = saving ? (
    <Loader2 size={16} className="animate-spin" />
  ) : (
    <UserPlus size={16} />
  );

  return (
    <main
      className={`${poppins.className} min-h-dvh w-full overflow-x-hidden transition-colors duration-500`}
      style={{
        backgroundColor: colors.page,
        color: colors.text,
      }}
    >
      {/*
        Theme variables + motion. Kept at the very top so the
        variables exist before any element that uses them.
      */}
      <style>{`
        :root {
          --cb-page: #f4f4f2;
          --cb-card: #ffffff;
          --cb-card-soft: #fafafa;
          --cb-text: #171717;
          --cb-muted: #6d6d68;
          --cb-border: #e5e5e1;
          --cb-red: #e01e1c;
          --cb-red-text: #cf1b19;
          --cb-yellow: #f8d346;
          --cb-yellow-soft: #fff7d2;
          --cb-header-bg: rgba(244, 244, 242, 0.9);
          --cb-bar-bg: rgba(255, 255, 255, 0.94);
        }

        .dark {
          --cb-page: #101010;
          --cb-card: #181818;
          --cb-card-soft: #202020;
          --cb-text: #f7f7f4;
          --cb-muted: #aaa9a3;
          --cb-border: #343434;
          --cb-red-text: #ff5a57;
          --cb-yellow-soft: #3a321b;
          --cb-header-bg: rgba(16, 16, 16, 0.9);
          --cb-bar-bg: rgba(24, 24, 24, 0.94);
        }

        .cb-focus:focus-visible {
          outline: 2px solid var(--cb-red-text);
          outline-offset: 2px;
        }

        .dark .cb-map {
          filter: brightness(0.86) contrast(1.05);
        }

        @keyframes cbRise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cb-rise {
          animation: cbRise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .cb-sheen::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 25%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 75%
          );
          transform: translateX(-120%);
          transition: transform 0.7s ease;
          pointer-events: none;
        }

        .cb-sheen:hover::after {
          transform: translateX(120%);
        }

        @media (prefers-reduced-motion: reduce) {
          .cb-rise {
            animation: none;
          }
          .cb-sheen::after {
            display: none;
          }
        }
      `}</style>

      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          backgroundColor: colors.headerBg,
          borderColor: colors.border,
        }}
      >
        <div className="mx-auto flex max-w-xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: colors.red,
                color: "#ffffff",
              }}
            >
              <BriefcaseBusiness size={15} />
            </div>

            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: colors.muted }}
              >
                Professional Profile
              </p>

              <p className="text-[12px] font-semibold">DexTap</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share profile"
              className={actionClass}
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.text,
              }}
            >
              <Share2 size={16} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (!mounted) return;

                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              }}
              aria-label={
                !mounted
                  ? "Toggle theme"
                  : resolvedTheme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
              }
              className={actionClass}
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.redText,
              }}
            >
              {!mounted ? (
                <span className="h-4 w-4" />
              ) : resolvedTheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
    HERO / PROFILE
====================================================== */}

      <section className="mx-auto w-full max-w-xl px-4 pb-8 pt-5 sm:px-6 sm:pt-8">
        <div
          className="cb-rise overflow-hidden rounded-[30px] border shadow-[0_25px_80px_rgba(0,0,0,0.10)]"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          {/* China Bank Savings banner */}
          <div className="relative h-44 overflow-hidden sm:h-52">
            <Image
              src={banner}
              alt="China Bank Savings"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 576px"
              className="object-cover"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.24))",
              }}
            />

            {/* The chip always sits on white, so it uses a fixed red. */}
            <div
              className="absolute left-5 top-5 flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "#cf1b19",
              }}
            >
              <ShieldCheck size={12} />
              Professional
            </div>

            {/* Brand stripe */}
            <div
              className="absolute inset-x-0 bottom-0 flex h-1"
              aria-hidden="true"
            >
              <span
                className="flex-[7]"
                style={{ backgroundColor: colors.red }}
              />
              <span
                className="flex-[3]"
                style={{ backgroundColor: colors.yellow }}
              />
            </div>
          </div>

          {/* Avatar — a two-tone brand ring */}
          <div className="relative flex justify-center">
            <div
              className="relative -mt-16 h-[134px] w-[134px] rounded-full p-[3px] shadow-xl sm:h-[150px] sm:w-[150px]"
              style={{
                background: `linear-gradient(135deg, ${colors.red}, ${colors.yellow})`,
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-full border-4"
                style={{
                  borderColor: colors.card,
                  backgroundColor: colors.card,
                }}
              >
                <Image
                  src={avatar}
                  alt={contactName}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="px-6 pb-7 pt-4 text-center sm:px-8">
            <p
              className={`mb-2 ${eyebrowClass}`}
              style={{ color: colors.redText }}
            >
              China Bank Savings
            </p>

            <h1 className="text-[28px] font-bold tracking-[-0.035em] sm:text-[32px]">
              {contactName}
            </h1>

            <p
              className="mt-1 text-[14px] font-medium"
              style={{ color: colors.muted }}
            >
              {contactTitle}
            </p>

            <div className="mt-5 flex items-center justify-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: colors.red }}
              />

              <span
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: colors.muted }}
              >
                Calapan Branch
              </span>

              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: colors.yellow }}
              />
            </div>

            {/* Main actions */}
            <div ref={heroActionsRef} className="mt-7">
              <div className="grid grid-cols-2 gap-2.5">
                {/* Call */}
                <a
                  href={phoneHref}
                  className={primaryButtonClass}
                  style={{
                    backgroundColor: colors.red,
                    boxShadow: "0 10px 25px rgba(224,30,28,0.22)",
                  }}
                >
                  <Phone size={15} />
                  Call
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className={secondaryButtonClass}
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.cardSoft,
                    color: colors.text,
                  }}
                >
                  <Mail size={15} />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFESSIONAL INFO
      ====================================================== */}

      <section
        aria-labelledby="cb-work-profile"
        className="mx-auto max-w-xl px-4 py-4 sm:px-6"
      >
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className={eyebrowClass} style={{ color: colors.redText }}>
              01 / Professional
            </p>

            <h2
              id="cb-work-profile"
              className="mt-1 text-[21px] font-bold tracking-[-0.025em]"
            >
              Work Profile
            </h2>
          </div>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              backgroundColor: colors.yellowSoft,
              color: colors.redText,
            }}
          >
            <BriefcaseBusiness size={16} />
          </div>
        </div>

        <div
          className="rounded-[24px] border p-5"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div className="flex gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: colors.yellowSoft,
                color: colors.redText,
              }}
            >
              <ShieldCheck size={19} />
            </div>

            <div>
              <p className="text-[14px] font-semibold">{contactTitle}</p>

              <p
                className="mt-1 text-[13px] leading-6"
                style={{ color: colors.muted }}
              >
                {businessName}
              </p>
            </div>
          </div>

          <div
            className="my-5 h-px"
            style={{ backgroundColor: colors.border }}
          />

          <p className="text-[13px] leading-6" style={{ color: colors.muted }}>
            Professional contact profile for business connections and client
            communication at the China Bank Savings Calapan Branch.
          </p>
        </div>
      </section>

      {/* =====================================================
          EXPERTISE
      ====================================================== */}

      <section
        aria-labelledby="cb-expertise"
        className="mx-auto max-w-xl px-4 py-6 sm:px-6"
      >
        <div className="mb-5">
          <p className={eyebrowClass} style={{ color: colors.redText }}>
            02 / Expertise
          </p>

          <h2
            id="cb-expertise"
            className="mt-1 text-[21px] font-bold tracking-[-0.025em]"
          >
            How I Can Help
          </h2>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[22px] border p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: colors.yellowSoft,
                  color: colors.redText,
                }}
              >
                <Icon size={18} />
              </div>

              <p className="mt-4 text-[14px] font-semibold">{title}</p>

              <p
                className="mt-1 text-[12px] leading-5"
                style={{ color: colors.muted }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ====================================================== */}

      <section
        aria-labelledby="cb-contact"
        className="mx-auto max-w-xl px-4 py-6 sm:px-6"
      >
        <div className="mb-5">
          <p className={eyebrowClass} style={{ color: colors.redText }}>
            03 / Contact
          </p>

          <h2
            id="cb-contact"
            className="mt-1 text-[21px] font-bold tracking-[-0.025em]"
          >
            Direct Contact
          </h2>
        </div>

        <div className="space-y-2.5">
          <ContactRow
            icon={<Phone size={16} />}
            label="Mobile"
            value={formatPhoneDisplay(phone)}
            href={phoneHref}
            onCopy={() => copyText(phone, "Number")}
          />

          <ContactRow
            icon={<Mail size={16} />}
            label="Email"
            value={email}
            href={`mailto:${email}`}
            onCopy={() => copyText(email, "Email")}
          />

          <ContactRow
            icon={<FaFacebookF size={15} />}
            label="Facebook"
            value="Leige Manalo"
            href={facebook}
            external
            filledIcon
          />
        </div>
      </section>

      {/* =====================================================
          BRANCH
      ====================================================== */}

      <section
        aria-labelledby="cb-branch"
        className="mx-auto max-w-xl px-4 py-6 sm:px-6"
      >
        <div className="mb-5">
          <p className={eyebrowClass} style={{ color: colors.redText }}>
            04 / Branch
          </p>

          <h2
            id="cb-branch"
            className="mt-1 text-[21px] font-bold tracking-[-0.025em]"
          >
            Visit The Branch
          </h2>
        </div>

        <div
          className="overflow-hidden rounded-[24px] border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div className="relative h-[220px] w-full sm:h-[260px]">
            <iframe
              src={mapEmbedUrl}
              title={`${businessName} location`}
              className="cb-map absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div
            className="flex items-center gap-4 border-t p-4"
            style={{ borderColor: colors.border }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: colors.yellowSoft,
                color: colors.redText,
              }}
            >
              <MapPin size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">
                {businessName}
              </p>

              <p
                className="mt-0.5 truncate text-[12px]"
                style={{ color: colors.muted }}
              >
                {addressLine}
              </p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="cb-focus flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardSoft,
                color: colors.text,
              }}
            >
              <Navigation size={14} />
              Directions
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          AUGURI — LOW KEY
      ====================================================== */}

      <section className="mx-auto max-w-xl px-4 py-5 sm:px-6">
        <a
          href={AUGURI_URL}
          target="_blank"
          rel="noreferrer"
          className="cb-focus group flex items-center gap-4 rounded-[24px] border p-5 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: colors.yellowSoft,
              color: colors.redText,
            }}
          >
            <span className="text-[13px] font-bold">A</span>
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: colors.muted }}
            >
              Other Business
            </p>

            <p className="mt-1 text-[14px] font-semibold">Auguri</p>

            <p className="mt-0.5 text-[12px]" style={{ color: colors.muted }}>
              More than just milktea.
            </p>
          </div>

          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardSoft,
              color: colors.redText,
            }}
          >
            <ArrowUpRight size={16} />
          </span>
        </a>
      </section>

      {/* =====================================================
          CLOSING CTA
      ====================================================== */}

      <section className="mx-auto max-w-xl px-4 pb-8 pt-5 sm:px-6">
        <div
          className="rounded-[28px] border p-6 text-center"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <h2 className="text-[19px] font-bold tracking-[-0.02em]">
            Let&rsquo;s stay in touch
          </h2>

          <p
            className="mx-auto mt-2 max-w-sm text-[13px] leading-6"
            style={{ color: colors.muted }}
          >
            Save my details to your phone so I&rsquo;m a tap away whenever you
            need banking help.
          </p>

          <button
            type="button"
            onClick={handleSaveContact}
            disabled={saving}
            aria-busy={saving}
            className={`${primaryButtonClass} mt-5`}
            style={{
              backgroundColor: colors.red,
              boxShadow: "0 12px 30px rgba(224,30,28,0.20)",
            }}
          >
            {saveIcon}
            {saveLabel}
          </button>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="px-6 pb-28 pt-4 text-center">
        <div
          className="mx-auto mb-5 h-px max-w-xl"
          style={{ backgroundColor: colors.border }}
        />

        <p
          className="text-[10px] font-medium uppercase tracking-[0.2em]"
          style={{ color: colors.muted }}
        >
          Professional digital profile
        </p>

        <div className="mt-2 flex items-center justify-center gap-1.5">
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ color: colors.muted }}
          >
            Powered by
          </span>

          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="cb-focus text-[11px] font-semibold tracking-[0.08em] transition-colors"
            style={{ color: colors.redText }}
          >
            DexTap
          </a>
        </div>
      </footer>

      {/* =====================================================
          FLOATING ACTION BAR
          Hidden until the hero actions scroll out of view.
      ====================================================== */}

      <div
        className={`
          fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm
          -translate-x-1/2 transition-all duration-300 ease-out
          ${
            showBar
              ? "translate-y-0 opacity-100"
              : "pointer-events-none invisible translate-y-24 opacity-0"
          }
        `}
      >
        <div
          className="flex items-center gap-2 rounded-full border p-2 shadow-2xl backdrop-blur-xl"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.barBg,
          }}
        >
          <button
            type="button"
            onClick={handleSaveContact}
            disabled={saving}
            className="cb-focus flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-[12px] font-semibold text-white disabled:opacity-80"
            style={{ backgroundColor: colors.red }}
          >
            {saveIcon}
            {saveLabel}
          </button>

          <a
            href={phoneHref}
            aria-label="Call"
            className="cb-focus flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor: colors.border,
              color: colors.redText,
            }}
          >
            <Phone size={16} />
          </a>

          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="cb-focus flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor: colors.border,
              color: colors.redText,
            }}
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      {/* =====================================================
          TOAST
      ====================================================== */}

      <div
        role="status"
        aria-live="polite"
        className={`
          pointer-events-none fixed left-1/2 z-[60] -translate-x-1/2
          rounded-full px-4 py-2.5 text-[12px] font-medium shadow-xl
          transition-all duration-300
          ${showBar ? "bottom-24" : "bottom-6"}
          ${toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
        `}
        style={{
          backgroundColor: colors.text,
          color: colors.page,
        }}
      >
        {toast}
      </div>
    </main>
  );
}
