import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import type { Social } from "./profiles";

export function SocialIcon({
  platform,
}: {
  platform: Social["platform"];
}) {
  const icons = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    tiktok: FaTiktok,
    linkedin: FaLinkedinIn,
    youtube: FaYoutube,
    x: FaXTwitter,
  };

  const Icon = icons[platform];

  return <Icon className="h-5 w-5" />;
}