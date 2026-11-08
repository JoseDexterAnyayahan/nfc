
import type { BusinessProfile } from "@/lib/profiles";

export const sbsGhie: BusinessProfile = {
  id: "rbs-ghie",
  type: "business",
  template: "rbs-ghie",

  businessName: "Rural Bank of Socorro",
  tagline: "Professional Banking. Personal Connection.",

  logo: "/profiles/business/rbs-ghie/rbs-logo.png",
  banner: "/profiles/business/rbs-ghie/rbs-cover.png",

  // Reusing her existing profile photograph.
  avatar:
    "/profiles/business/ghie-larracas/rosalie-avatar.jpg",

  contactName: "Rosalie “Ghie” F. Larracas",
  contactTitle: "General Manager",

  phone: "09175832730",
  email: "gf_brl@yahoo.com",

  location: "Rural Bank of Socorro",
  locationUrl:
    "https://maps.app.goo.gl/rmXggFZwFqJBLL6a9",

  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/ghie.larracas",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/ghieferriol/",
    },
    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@ghielarracas",
    },
  ],
};

export default sbsGhie;
