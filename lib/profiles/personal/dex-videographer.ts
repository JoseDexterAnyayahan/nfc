import type { PersonalProfile } from "../index";

const dexVideographer: PersonalProfile = {
  id: "dex-videographer",

  type: "personal",

  template: "videographer",

  name: "Dex Anyayahan",

  title: "Videographer & Photographer",

  company: "DexTap",

  avatar: "/profiles/personal/jd.png",

  email: "anyayahanjosedexter@gmail.com",

  phone: "0966 883 0150",

  whatsapp: "639668830150",

  website: "https://dextap.vercel.app/",

  location: "Calapan City, Oriental Mindoro",

  locationUrl:
    "https://www.google.com/maps/search/?api=1&query=Calapan%20City%2C%20Oriental%20Mindoro",

  bio:
    "I capture weddings, celebrations, portraits, and brand moments through thoughtful photography and cinematic video. My goal is to turn real moments into visuals you can keep, share, and remember.",

  services: [
    {
      name: "Event Videography",
      description:
        "Cinematic coverage for weddings, birthdays, debuts, business events, and special occasions.",
    },

    {
      name: "Event Photography",
      description:
        "Natural and expressive photography that preserves the people, details, and moments that matter.",
    },

    {
      name: "Prenup & Couple Sessions",
      description:
        "Romantic visual storytelling for couples, prenups, portraits, and memorable milestones.",
    },

    {
      name: "Video Editing",
      description:
        "Story-driven editing with pacing, transitions, color grading, and music to bring your footage together.",
    },

    {
      name: "Photo Editing",
      description:
        "Careful color correction, retouching, and visual enhancement for polished final images.",
    },

    {
      name: "Brand & Business Content",
      description:
        "Visual content designed to help businesses present their story, events, and brand with impact.",
    },
  ],

  portfolio: [
    {
      id: "project-1",

      title: "Wedding",

      category: "Wedding Videography",

      image: "/profiles/personal/work/wedding.jpg",

      videoUrl:
        "https://www.facebook.com/share/v/1F8vpZTKLE/",

      description:
        "A wedding film focused on genuine emotions, meaningful moments, and the atmosphere of the celebration.",
    },

    {
      id: "project-2",

      title: "7th Birthday",

      category: "Event Photography",

      image: "/profiles/personal/work/7th.jpg",

      description:
        "Birthday photography capturing candid moments, portraits, details, and the energy of a child's special day.",
    },

    {
      id: "project-3",

      title: "Prenup",

      category: "Couple Photography",

      image: "/profiles/personal/work/prenup.jpg",

      description:
        "A relaxed couple session focused on connection, natural expressions, and moments shared together.",
    },

    {
      id: "project-4",

      title: "18th Birthday",

      category: "Debut Videography",

      image: "/profiles/personal/work/debut.jpg",

      videoUrl:
        "https://www.facebook.com/share/v/1GfgHak2Ao/",

      description:
        "A debut film capturing the celebration, people, and memorable moments of an important milestone.",
    },
  ],

  testimonials: [
    {
      id: "review-1",

      name: "Sarah Johnson",

      role: "Bride",

      message:
        "The photos and video captured the entire feeling of the day. Everything looked cinematic and natural.",

      avatar:
        "/profiles/personal/reviews/cel.jpg",

      rating: 5,
    },

    {
      id: "review-2",

      name: "Michael Reyes",

      role: "Business Owner",

      message:
        "Professional from beginning to end. The final video helped us present our business in a completely different way.",

      avatar:
        "/profiles/personal/reviews/hermione.jpg",

      rating: 5,
    },
  ],

  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/jaydee.anyayahan",
    },

    {
      platform: "instagram",
      url: "https://www.instagram.com/jyd.wrld/",
    },

    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/jose-dexter-anyayahan-4647923a6/",
    },

    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@unsaidjd",
    },

    {
      platform: "youtube",
      url: "https://www.youtube.com/",
    },

    {
      platform: "whatsapp",
      url: "https://wa.me/639668830150",
    },
  ],
};

export default dexVideographer;