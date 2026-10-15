import { FaArrowUp, FaRegAddressCard } from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import { suzukiContainerClass } from "./suzuki-styles";

type Props = {
  profile: BusinessProfile;
};

export default function SuzukiFooter({ profile }: Props) {
  return (
    <footer className="border-t border-[var(--suzuki-border)] bg-[var(--suzuki-card)]">
      <div
        className={`${suzukiContainerClass} flex flex-col items-center gap-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left`}
      >
        {/* Dealership and service advisor */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-extrabold tracking-widest text-[var(--suzuki-text)]">
              SUZUKI
            </span>
            <span className="h-4 w-1 rounded-full bg-[var(--suzuki-red)]" />
            <span className="text-xs font-semibold tracking-wide text-[var(--suzuki-muted)]">
              AUTO CALAPAN
            </span>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-[var(--suzuki-muted)]">
            {profile.contactName || profile.businessName} ·{" "}
            {profile.contactTitle || "Service Advisor"}
          </p>
        </div>

        {/* Back to top */}
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--suzuki-border)] px-4 py-2.5 text-sm font-semibold text-[var(--suzuki-blue)] transition hover:border-[var(--suzuki-blue)] hover:bg-[var(--suzuki-blue)]/5 sm:self-auto"
        >
          Back to top
          <FaArrowUp size={12} />
        </a>
      </div>

      {/* DexTap attribution */}
      <div className="border-t border-[var(--suzuki-border)] px-5 py-4 text-center">
        <a
          href="https://dextap.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Powered by DexTap"
          className="inline-flex items-center gap-2 text-xs text-[var(--suzuki-muted)] transition-colors hover:text-[var(--suzuki-blue)]"
        >
          <FaRegAddressCard size={13} />
          <span>
            Powered by{" "}
            <span className="font-semibold text-[var(--suzuki-text)]">
              DexTap
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
}
