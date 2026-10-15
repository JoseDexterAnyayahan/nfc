
import type { BusinessProfile } from "@/lib/profiles";

export const suzukiAdvisorProfile: BusinessProfile = {
  id: "szk-jlc",
  type: "business",
  template: "suzuki-advisor",

  businessName: "Jhon Loyd B. Caganan",
  tagline: "Your Service, Our Commitment",
  logo: "/profiles/business/suzuki-advisor/szk-logo.png",
  avatar: "/profiles/business/suzuki-advisor/jlc-avatar.jpg",
  banner: "/profiles/business/suzuki-advisor/szk-banner.jpg",

  contactName: "Jhon Loyd B. Caganan",
  contactTitle: "Service Advisor",

  email: "jhonloyd.caganan@suzukicalapan.com",
  phone: "09938680567",

  location: "Suzuki Auto Calapan, Oriental Mindoro",
  locationUrl: "https://maps.app.goo.gl/r18QAyNbBniHH6kA6",

  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/jhonloyd.caganan.1",
    },
  ],

  bio:
    "Your point of contact for service inquiries and assistance at Suzuki Auto Calapan. Connect with me for support and information about your vehicle's service needs.",

  services: [
    {
      name: "Service Inquiries",
      description:
        "Get in touch for assistance with your vehicle's service-related questions.",
    },
    {
      name: "Service Coordination",
      description:
        "Connect with me to discuss your service concerns and next steps.",
    },
    {
      name: "Customer Assistance",
      description:
        "A convenient point of contact for questions and dealership assistance.",
    },
  ],
};
