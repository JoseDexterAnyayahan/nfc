import type { Social } from "@/lib/profiles";
import { SocialIcon } from "@/lib/social-icons";

export default function SocialLinks({
  socials = [],
}: {
  socials?: Social[];
}) {
  if (socials.length === 0) return null;

  return (
    <div className="flex justify-center gap-3">
      {socials.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105"
        >
          <SocialIcon platform={social.platform} />
        </a>
      ))}
    </div>
  );
}