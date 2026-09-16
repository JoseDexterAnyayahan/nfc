"use client";

import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { useTheme } from "next-themes";
import { Moon, Nfc, Sun } from "lucide-react";

import type { PersonalProfile } from "@/lib/profiles";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SocialLinks from "../SocialLinks";
import ProfileActions from "../ProfileActions";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

/**
 * PersonalDossier
 * ----------------------------------------------------------------------
 * A second personal NFC card template — same data contract as
 * PersonalModern, but with a deliberately different layout and palette.
 *
 * Template-specific changes:
 * - Space Grotesk typography
 * - Colored social icons
 * - "Socials" section label
 * - DexTap NFC footer branding
 *
 * These changes are scoped to this template and do not affect the other
 * templates.
 */
export default function PersonalDossier({
  profile,
}: {
  profile: PersonalProfile;
}) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <main
      className={`${spaceGrotesk.variable} flex min-h-dvh w-full items-center justify-center bg-[#F9F7F7] font-sans dark:bg-[#0B1B2E] sm:p-6`}
    >
      <div className="relative flex min-h-dvh w-full flex-col overflow-hidden duration-700 animate-in fade-in sm:min-h-0 sm:w-full sm:max-w-2xl sm:flex-row sm:rounded-[1.75rem] sm:border sm:border-[#112D4E]/10 sm:shadow-2xl sm:shadow-black/10 dark:sm:border-white/10">
        {/* ---------- Identity stub ---------- */}
        <div
          className="relative flex flex-col items-start justify-center gap-4 bg-[#112D4E] px-7 pb-9 pt-10 text-[#F9F7F7] sm:w-[38%] sm:justify-center sm:px-7 sm:py-10"
          style={{
            paddingTop: "max(2.5rem, env(safe-area-inset-top))",
            backgroundImage:
              "radial-gradient(rgba(219,226,239,0.10) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="absolute right-3 top-3 rounded-full text-[#DBE2EF] hover:bg-white/10 hover:text-[#F9F7F7]"
            style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>

          <div className="overflow-hidden rounded-2xl border-2 border-[#DBE2EF]/30 bg-[#0B1B2E] shadow-lg">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={112}
              height={112}
              priority
              className="h-24 w-24 object-cover sm:h-28 sm:w-28"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
              {profile.name}
            </h1>

            {profile.title && (
              <p className="mt-2 inline-block border-b border-[#3F72AF] pb-0.5 text-sm text-[#DBE2EF]">
                {profile.title}
              </p>
            )}
          </div>
        </div>

        {/* ---------- Perforated seam ---------- */}
        <div
          className="relative shrink-0 border-t border-dashed border-[#112D4E]/15 sm:border-l sm:border-t-0 sm:border-[#112D4E]/10 dark:border-white/10"
          aria-hidden="true"
        >
          <span className="absolute -left-1.5 -top-1.5 hidden h-3 w-3 rounded-full bg-[#F9F7F7] dark:bg-[#0B1B2E] sm:block" />
          <span className="absolute -bottom-1.5 -left-1.5 hidden h-3 w-3 rounded-full bg-[#F9F7F7] dark:bg-[#0B1B2E] sm:block" />
        </div>

        {/* ---------- Detail stub ---------- */}
        <div
          className="flex flex-1 flex-col justify-between bg-[#F9F7F7] px-7 py-8 dark:bg-[#0F2038] sm:py-9"
          style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
        >
          <div className="space-y-7">
            <section>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#112D4E]/50 dark:text-[#DBE2EF]/50">
                Contact
              </p>

              <ProfileActions
                email={profile.email}
                phone={profile.phone}
                website={profile.website}
                className="border-[#DBE2EF] hover:bg-[#DBE2EF]/40 dark:border-white/10 dark:hover:bg-white/5"
              />
            </section>

            {profile.socials && profile.socials.length > 0 && (
              <section>
                <Separator className="mb-6 bg-[#DBE2EF] dark:bg-white/10" />

                <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#112D4E]/50 dark:text-[#DBE2EF]/50">
                  Socials
                </p>

                <SocialLinks
                  socials={profile.socials}
                  colored
                  className="border-[#DBE2EF] hover:bg-[#DBE2EF]/40 dark:border-white/10 dark:hover:bg-white/5"
                />
              </section>
            )}
          </div>

          {/* ---------- DexTap branding ---------- */}
          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center gap-1.5 text-xs font-medium text-[black] transition-opacity hover:opacity-70 dark:text-[white] sm:w-fit sm:justify-start"
            aria-label="Powered by DexTap"
          >
            <Nfc className="h-3.5 w-3.5" strokeWidth={2} />
            <span>
              Powered by <span className="font-semibold">DexTap</span>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
