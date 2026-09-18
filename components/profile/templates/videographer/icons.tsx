import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import {
  FiArrowUpRight,
  FiCamera,
  FiCheck,
  FiChevronRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMoon,
  FiPlay,
  FiPhone,
  FiShare2,
  FiStar,
  FiSun,
  FiUserPlus,
  FiVideo,
} from "react-icons/fi";

export {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
  FiArrowUpRight,
  FiCamera,
  FiCheck,
  FiChevronRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMoon,
  FiPlay,
  FiPhone,
  FiShare2,
  FiStar,
  FiSun,
  FiUserPlus,
  FiVideo,
};

export function SocialIcon({
  platform,
}: {
  platform: string;
}) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <FaFacebookF size={17} />;

    case "instagram":
      return <FaInstagram size={18} />;

    case "linkedin":
      return <FaLinkedinIn size={17} />;

    case "tiktok":
      return <FaTiktok size={18} />;

    case "youtube":
      return <FaYoutube size={18} />;

    case "whatsapp":
      return <FaWhatsapp size={18} />;

    case "x":
      return <FaXTwitter size={17} />;

    default:
      return <FiGlobe size={18} />;
  }
}

export function socialColor(
  platform: string,
) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return "text-[#1877F2]";

    case "instagram":
      return "text-[#E4405F]";

    case "linkedin":
      return "text-[#0A66C2]";

    case "tiktok":
      return "text-black dark:text-white";

    case "youtube":
      return "text-[#FF0000]";

    case "whatsapp":
      return "text-[#25D366]";

    case "x":
      return "text-black dark:text-white";

    default:
      return "text-black dark:text-white";
  }
}