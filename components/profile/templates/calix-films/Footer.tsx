import type { BusinessProfile } from "@/lib/profiles";
import { FaCamera } from "react-icons/fa6";
import SocialLinks from "./SocialLinks";

type Props = {
  profile: BusinessProfile;
};

export default function Footer({ profile }: Props) {
  return (
    <footer className="bg-[#000000] px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 border-b border-[#C0A08E]/10 pb-8 text-center md:flex-row md:text-left">
        <div>
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <FaCamera className="text-xl text-[#996D51]" />
            <h3 className="font-bold tracking-wider text-[#C0A08E]">
              {profile.businessName}
            </h3>
          </div>

          <p className="mt-2 text-xs text-[#C0A08E]/50">
            {profile.tagline || "PHOTO • VIDEO"}
          </p>
        </div>

      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 pt-7 text-center text-xs text-[#C0A08E]/40 md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.businessName}. All rights
          reserved.
        </p>

        <a
          href="https://dextap.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-[#C0A08E]"
        >
          Powered by DexTap
        </a>
      </div>
    </footer>
  );
}