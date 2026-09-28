import type { BusinessProfile } from "@/lib/profiles";

const gioManalo: BusinessProfile = {
  id: "gio-manalo",
  type: "business",
  template: "professional",

  businessName: "China Bank Savings Calapan Branch",
  tagline: "Business Manager",

  // China Bank Savings branding
  logo: "/profiles/business/china-bank-savings/cbs-cover.png",
  banner: "/profiles/business/china-bank-savings/cbs-cover.jpg",

  // Gio's personal profile photo
  avatar: "/profiles/business/china-bank-savings/gio.jpg",

  contactName: "Gio Manalo",
  contactTitle: "Business Manager",

  phone: "09399796582",
  email: "eamanalo.cbs@chinabank.ph",

  website: "",

  location: "China Bank Savings Calapan Branch",
  locationUrl: "",

  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/search/top?q=Leige%20Manalo",
    },
  ],
};

export default gioManalo;