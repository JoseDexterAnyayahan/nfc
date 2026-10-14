import type { BusinessProfile } from "@/lib/profiles";

const kntoKlsk: BusinessProfile = {
  id: "knto-klsk",
  type: "business",
  template: "kntoklsk",

  businessName: "KNTO KLSK",
  tagline: "DROP THE NEEDLE. SIP THE MOMENTS.",

  logo: "/profiles/business/knto-klsk/knto-logo.jpg",
  banner: "/profiles/business/knto-klsk/knto-banner.jpg",

  email: "",
  phone: "",
  website: "",

  location:
    "C57J+G7X, Osmeña, A. Bonifacio, Calapan City, Oriental Mindoro",

  locationUrl:
    "https://www.google.com/maps/search/?api=1&query=C57J%2BG7X%2C%20Osme%C3%B1a%2C%20A.%20Bonifacio%2C%20Calapan%20City%2C%20Oriental%20Mindoro",

  socials: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/kntoklsk/",
    },
    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@knto.klsk",
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/KntoKlsk/",
    },
  ],

  hours:
    "Sunday–Thursday: 11:00 AM–10:00 PM (last order 9:20 PM); Friday–Saturday: 11:00 AM–11:00 PM (last order 10:20 PM).",
};

export default kntoKlsk;