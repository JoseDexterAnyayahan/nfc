"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import type { BusinessProfile } from "@/lib/profiles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SocialLinks from "../SocialLinks";
import ProfileActions from "../ProfileActions";

/**
 * BusinessModern
 * ----------------------------------------------------------------------
 * Full page layout for a business NFC card route. page.tsx needs nothing
 * else around it:
 *
 *   export default async function Page({ params }) {
 *     const profile = getBusinessProfile(id);
 *     return <BusinessModern profile={profile} />;
 *   }
 *
 * Below `sm`, the card itself IS the screen — full-bleed, no visible
 * outer canvas, edge to edge, like a native app screen. From `sm` up it
 * becomes a centered floating card on a decorative background.
 *
 * Requires shadcn components: card, badge, separator, button
 *   npx shadcn@latest add card badge separator button
 * Requires next-themes for the dark/light toggle (root layout must wrap
 * children in <ThemeProvider attribute="class">):
 *   npm install next-themes
 */
export default function BusinessModern({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background sm:px-6 sm:py-10">
      {/* Decorative background — only visible from sm up, where the card floats */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.border)_1px,transparent_0)] bg-[size:24px_24px] opacity-[0.15] dark:opacity-[0.08]" />
      </div>

      <Card
        className="animate-in fade-in relative flex min-h-dvh w-full flex-col overflow-hidden rounded-none border-0 bg-background shadow-none ring-0 duration-700 sm:min-h-0 sm:w-full sm:max-w-md sm:rounded-[2rem] sm:border sm:border-border/60 sm:bg-card/80 sm:shadow-2xl sm:shadow-black/5 sm:ring-1 sm:ring-black/5 sm:backdrop-blur-xl dark:sm:shadow-black/40 dark:sm:ring-white/5"
      >
        {/* Theme toggle lives inside the profile itself */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="absolute right-4 z-10 rounded-full"
          style={{ top: "max(1rem, env(safe-area-inset-top))" }}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>

        <CardContent
          className="flex flex-1 flex-col items-center justify-center px-6 text-center sm:flex-none sm:justify-start sm:px-8 sm:py-10"
          style={{
            paddingTop: "max(2.5rem, env(safe-area-inset-top))",
            paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
          }}
        >
          {/* Logo plate — square, gradient border + glow, object-contain so
              transparent-background logos never get cropped like a photo would */}
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-[1.75rem] bg-gradient-to-br from-primary/60 to-primary/10 blur-xl"
              aria-hidden="true"
            />
            <div className="rounded-[1.75rem] bg-gradient-to-br from-primary to-primary/30 p-[3px] shadow-lg">
              <div className="flex h-28 w-28 items-center justify-center rounded-[1.6rem] bg-background p-3 sm:h-32 sm:w-32">
                <Image
                  src={profile.logo}
                  alt={profile.businessName}
                  width={140}
                  height={140}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:mt-6 sm:text-3xl">
            {profile.businessName}
          </h1>

          {profile.tagline && (
            <Badge
              variant="secondary"
              className="mt-3 rounded-full px-3.5 py-1 text-xs font-medium sm:text-sm"
            >
              {profile.tagline}
            </Badge>
          )}

          <Separator className="mt-7 sm:mt-8" />

          <div className="mt-7 w-full sm:mt-8">
            <ProfileActions
              email={profile.email}
              phone={profile.phone}
              website={profile.website}
              link={profile.link}
            />
          </div>

          {profile.socials && profile.socials.length > 0 && (
            <div className="mt-7 w-full sm:mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                Connect
              </p>
              <SocialLinks socials={profile.socials} />
            </div>
          )}

          {/* Footer branding — swap for your own NFC brand mark */}
          <p className="mt-8 text-xs text-muted-foreground/60">
            Digital Business Card
          </p>
        </CardContent>
      </Card>
    </main>
  );
}