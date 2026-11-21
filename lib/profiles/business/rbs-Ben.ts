import type { BusinessProfile } from "@/lib/profiles";

export const sbsBen: BusinessProfile = {
  id: "rbs-ben",
  type: "business",
  template: "rbs-ben",

  businessName: "Rural Bank of Socorro",
  tagline: "Professional Banking. Personal Connection.",

  logo: "/profiles/business/rbs-ben/rbs-logo.png",
  banner: "/profiles/business/rbs-ben/rbs-cover.png",

  // Ben-Hur's profile photograph
  avatar: "/profiles/business/rbs-ben/avatar.jpg",

  contactName: "Ben-Hur R. Larracas",
  contactTitle: "President/CEO",

  phone: "09178615177",
  email: "blarracas@yahoo.com",

  location: "Rural Bank of Socorro",
  locationUrl:
    "https://maps.app.goo.gl/rmXggFZwFqJBLL6a9",

  socials: [
    {
      platform: "facebook",
      url: "https://facebook.com/benjie.r.larracas",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/benjielarracas/",
    },
  ],
};

export default sbsBen;