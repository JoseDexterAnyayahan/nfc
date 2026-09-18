import type { PersonalProfile } from "../index";

const dentistProfile: PersonalProfile = {
  id: "dentist",

  type: "personal",

  template: "dentist",

  // --------------------------------
  // BASIC INFORMATION
  // --------------------------------

  name: "Dr. Anna Reyes",

  title: "Dentist",

  company: "Smile Care Dental Clinic",

  avatar: "/profiles/personal/reviews/hermione.jpg",

  // --------------------------------
  // CONTACT
  // --------------------------------

  email: "hello@smilecare.com",

  phone: "0917 123 4567",

  whatsapp: "639171234567",

  website: "https://smilecare.com",

  // --------------------------------
  // LOCATION
  // --------------------------------

  location: "Calapan City, Oriental Mindoro",

  locationUrl:
    "https://www.google.com/maps/search/?api=1&query=Calapan%20City%2C%20Oriental%20Mindoro",

  // --------------------------------
  // ABOUT
  // --------------------------------

  bio:
    "I’m passionate about helping patients achieve healthy, confident smiles through compassionate care and modern dental solutions.",

  // --------------------------------
  // SERVICES
  // --------------------------------

  services: [
    {
      name: "General Dentistry",
      description:
        "Complete dental care for maintaining healthy teeth and gums.",
    },

    {
      name: "Cosmetic Dentistry",
      description:
        "Smile-focused treatments designed to improve the appearance of your teeth.",
    },

    {
      name: "Orthodontics",
      description:
        "Personalized treatment for straighter teeth and a healthier bite.",
    },

    {
      name: "Teeth Whitening",
      description:
        "Professional whitening treatments for a brighter, more confident smile.",
    },

    {
      name: "Dental Implants",
      description:
        "Natural-looking tooth replacement solutions designed for long-term function.",
    },
  ],

  // --------------------------------
  // BEFORE / AFTER RESULTS
  // --------------------------------

  dentistResults: [
    {
      before: "/profiles/personal/dentist/before.png",

      after: "/profiles/personal/dentist/after.png",

      title: "Small changes. Beautiful results.",

      description:
        "Thoughtfully planned dental treatment focused on creating a natural and confident smile.",
    },
  ],

  // --------------------------------
  // CREDENTIALS
  // --------------------------------

  dentistCredentials: [
    {
      title: "Doctor of Dental Surgery",

      institution: "University of the East – Manila",
    },

    {
      title: "Professional Member",

      institution: "Philippine Dental Association",
    },
  ],

  // --------------------------------
  // TESTIMONIALS
  // --------------------------------

  testimonials: [
    {
      id: "dentist-review-1",

      name: "Maria Santos",

      role: "Happy Patient",

      message:
        "Dr. Anna is amazing! She makes every visit comfortable and stress-free. My smile has never looked better!",

      avatar:
        "/profiles/personal/cel.jpg",

      rating: 5,
    },
  ],

  // --------------------------------
  // SOCIAL MEDIA
  // --------------------------------

  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/",
    },

    {
      platform: "instagram",
      url: "https://www.instagram.com/",
    },

    {
      platform: "linkedin",
      url: "https://www.linkedin.com/",
    },
  ],
};

export default dentistProfile;