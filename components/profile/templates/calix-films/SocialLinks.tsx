import type { Social } from "@/lib/profiles";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

type Props = {
  socials?: Social[];
};

const icons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  x: FaXTwitter,
};

export default function SocialLinks({ socials = [] }: Props) {
  if (!socials.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {socials.map((social) => {
        const Icon = icons[social.platform];

        return (
          <a
            key={`${social.platform}-${social.url}`}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C0A08E]/20 bg-[#262B28] text-[#C0A08E] transition hover:border-[#996D51] hover:bg-[#996D51] hover:text-white"
          >
            <Icon size={17} />
          </a>
        );
      })}
    </div>
  );
}