import type { BusinessProfile } from "@/lib/profiles";

const litratoCafe: BusinessProfile = {
  id: "litrato-cafe",
  type: "business",
  template: "litrato-cafe",

  businessName: "Litrato Café",
  tagline: "SHOT IN EVERY SIP",
  logo: "/profiles/business/litrato-cafe/litrato-logo.jpg",
  banner: "/profiles/business/litrato-cafe/litrato-banner.jpg",

  email: "litratocafe@gmail.com",
  phone: "09495636303",

  location: "Litrato Café",
  locationUrl: "https://maps.app.goo.gl/qvd2bDSyBbBAur679",

  reviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJldxCh-DpvDMRjVKjfXjJnsI",

  bio: "Your place for good coffee, beautiful spaces, and moments worth keeping.",

  services: [
    { name: "Delivery" },
    { name: "In-store pickup" },
    { name: "Takeout" },
    { name: "Reservations" },
    { name: "Dine-in" },
  ],

  socials: [
    { platform: "facebook", url: "https://www.facebook.com/LitratoCafe" },
    { platform: "instagram", url: "https://www.instagram.com/litratocafe/" },
    { platform: "tiktok", url: "https://www.tiktok.com/@litratocafe" },
  ],

  highlights: [
    {
      src: "/profiles/business/litrato-cafe/featured1.jpg",
      title: "Coffee Moments",
      caption: "A little pause in the middle of your day.",
      url: "https://www.facebook.com/share/p/1CZkg3MX63/",
    },
    {
      src: "/profiles/business/litrato-cafe/featured2.jpg",
      title: "Made to Be Savored",
      caption: "Your favorite sip, one moment at a time.",
      url: "https://www.facebook.com/share/p/19VWzBqDeV/",
    },
    {
      src: "/profiles/business/litrato-cafe/featured3.jpg",
      title: "A Space to Stay",
      caption: "Bright corners and good company.",
      url: "https://www.facebook.com/share/p/1FExBQna9s/",
    },
    {
      src: "/profiles/business/litrato-cafe/featured4.jpg",
      title: "Little Things, Lasting Memories",
      caption: "Make room for another good moment.",
      url: "https://www.facebook.com/share/p/1JvXiDMKK8/",
    },
  ],

  // Add the exact Facebook or Instagram post URL here.
  seeMoreUrl: "",

  // Add verified business hours when available.
  hours: "",
};

export default litratoCafe;
