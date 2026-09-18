import type { PersonalProfile } from "../index";

const insuranceAgent: PersonalProfile = {
  id: "insurance-agent",

  type: "personal",

  template: "insurance",

  name: "Dex Anyayahan",

  title: "Insurance Agent",

  company: "SecureLife",

  avatar:
    "/profiles/personal/jd.png",

  banner:
    "/profiles/personal/insurance-banner.jpg",

  email:
    "john.delacruz@example.com",

  phone:
    "0917 123 4567",

  whatsapp:
    "639171234567",

  website:
    "https://example.com",

  location:
    "Calapan City, Oriental Mindoro",

  locationUrl:
    "https://www.google.com/maps/search/?api=1&query=Calapan%20City%2C%20Oriental%20Mindoro",

  bio:
    "Helping individuals and families build a secure future with the right protection and financial solutions.",

  services: [
    {
      name: "Life Insurance",

      description:
        "Financial protection for your loved ones.",
    },

    {
      name: "Health Insurance",

      description:
        "Coverage for medical needs and emergencies.",
    },

    {
      name: "Accident Insurance",

      description:
        "Protection against unexpected events.",
    },

    {
      name: "Investment Plans",

      description:
        "Build your wealth while planning for the future.",
    },
  ],

  testimonials: [
    {
      id: "review-1",

      name: "Maria Santos",

      role: "Client",

      message:
        "John made the process easy to understand. I feel more confident knowing my family is protected.",

      avatar:
        "/profiles/personal/reviews/cel.jpg",

      rating: 5,
    },

    {
      id: "review-2",

      name: "Carlo Reyes",

      role: "Entrepreneur",

      message:
        "He explained every detail clearly and helped me find a plan that matched my needs.",

      avatar:
        "/profiles/personal/reviews/hermione.jpg",

      rating: 5,
    },
  ],

  socials: [
    {
      platform: "facebook",
      url: "https://facebook.com/",
    },

    {
      platform: "instagram",
      url: "https://instagram.com/",
    },

    {
      platform: "linkedin",
      url: "https://linkedin.com/",
    },

    {
      platform: "tiktok",
      url: "https://tiktok.com/",
    },

    {
      platform: "youtube",
      url: "https://youtube.com/",
    },

    {
      platform: "whatsapp",
      url: "https://wa.me/639171234567",
    },
  ],
};

export default insuranceAgent;