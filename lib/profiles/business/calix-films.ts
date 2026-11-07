import type { BusinessProfile } from "@/lib/profiles";

const calixFilms: BusinessProfile = {
  id: "CalixFilms",
  type: "business",
  template: "calix-films",

  businessName: "CALIX FILMS AND PHOTOGRAPHY",
  tagline: "PHOTO • VIDEO",

  // Cover image shown at the top of the hero
  banner: "/profiles/business/calix/coverphoto.jpg",

  // Main profile picture. Replace with a photo of James when available;
  // the business logo then appears as a badge on its corner.
  avatar: "/profiles/business/calix/calix-photo.jpg",

  // Business logo, shown as the badge on the avatar
  logo: "/profiles/business/calix/logo.png",

  contactName: "James Henry Calica",

  email: "jameshenrycalica3@gmail.com",
  phone: "09918253892",

  location: "Calapan City, Oriental Mindoro",

  // Personal social media accounts
  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/jameshenry.f.calica.7",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/ja_me_ss_9/",
    },
    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@calics09",
    },
  ],

  // Package category banner photos
packageBanners: {
  wedding: "/profiles/business/calix/packages/calix-wedding.jpg",
  birthday: "/profiles/business/calix/packages/calix-18th.jpg",
  kiddie: "/profiles/business/calix/packages/calix-kiddie.jpg",
},

highlights: [
  {
    src: "/profiles/business/calix/featured/featured-wedding.jpg",
    title: "Wedding Photography",
    caption: "Capturing love, emotion, and timeless memories.",
    url: "https://www.facebook.com/share/p/1FKRkhNHfs/",
  },
  {
    src: "/profiles/business/calix/featured/featured-18th.jpg",
    title: "18th Birthday",
    caption: "Celebrating milestones and unforgettable moments.",
    url: "https://www.facebook.com/share/p/1d9uHVisfA/",
  },
  {
    src: "/profiles/business/calix/featured/featured-kiddie.jpg",
    title: "Kiddie Celebrations",
    caption: "Preserving the joy of every little celebration.",
    url: "https://www.facebook.com/share/p/1HHEkmKxPD/",
  },
],

  // Business social media accounts (no longer shown in the hero)
  businessSocials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/rapgene.com.ph",
    },
  ],

  bio: "CALIX FILMS AND PHOTOGRAPHY captures meaningful moments through photography and videography.",
};

export default calixFilms;