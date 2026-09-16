import type { Social } from "@/lib/profiles";
import { SocialIcon } from "@/lib/social-icons";
import { cn } from "@/lib/utils";

const socialColors: Record<string, string> = {
  facebook: "text-[#1877F2]",
  instagram: "text-[#E4405F]",
  linkedin: "text-[#0A66C2]",
  twitter: "text-[#1DA1F2]",
  x: "text-[#000000] dark:text-white",
  youtube: "text-[#FF0000]",
  tiktok: "text-[#000000] dark:text-white",
  whatsapp: "text-[#25D366]",
  telegram: "text-[#229ED9]",
  github: "text-[#181717] dark:text-white",
  discord: "text-[#5865F2]",
  threads: "text-[#000000] dark:text-white",
  pinterest: "text-[#E60023]",
  snapchat: "text-[#FFFC00]",
  reddit: "text-[#FF4500]",
  spotify: "text-[#1DB954]",
};

export default function SocialLinks({
  socials = [],
  className,
  colored = false,
}: {
  socials?: Social[];
  /** Optional extra classes applied to each icon circle. */
  className?: string;
  /** When true, social icons use their recognizable platform colors. */
  colored?: boolean;
}) {
  if (socials.length === 0) return null;

  return (
    <div className="flex justify-center gap-3">
      {socials.map((social) => {
        const platform = social.platform.toLowerCase();
        const colorClass = colored
          ? socialColors[platform] ?? "text-[#3F72AF]"
          : "";

        return (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105",
              colorClass,
              className
            )}
          >
            <SocialIcon platform={social.platform} />
          </a>
        );
      })}
    </div>
  );
}
