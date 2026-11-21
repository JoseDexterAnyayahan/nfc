import type { BusinessProfile } from "@/lib/profiles";

export const sbsLeizel: BusinessProfile = {
  id: "rbs-leizel",
  type: "business",
  template: "rbs-leizel",

  businessName: "Rural Bank of Socorro - Gloria Branch",
  tagline: "Professional Banking. Personal Connection.",

  logo: "/profiles/business/rbs-ghie/rbs-logo.png",
  banner: "/profiles/business/rbs-ghie/rbs-cover.png",

  // Leizel's profile photograph
  avatar: "/profiles/business/rbs-leizel/avatar.jpg",

  contactName: "Leizel Marasigan Ortega",
  contactTitle: "Branch Manager",

  phone: "09453471408",
  email: "rbsi.leizelortega22@gmail.com",

  location: "Rural Bank of Socorro - Gloria Branch",
  locationUrl:
    "https://maps.app.goo.gl/rmXggFZwFqJBLL6a9",

  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/leizel.ortega.2025",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/leizel.ortega/",
    },
  ],
};

export default sbsLeizel;