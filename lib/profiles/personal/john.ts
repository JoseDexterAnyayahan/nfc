import type { PersonalProfile } from "../index";

const john: PersonalProfile = {
  id: "P8xK42Lm",
  type: "personal",
  template: "modern",
  name: "John Cruz",
  title: "Real Estate Professional",
  avatar: "/profiles/personal/john.jpg",
  email: "john@gmail.com",
  phone: "+63 917 123 4567",
  website: "https://example.com",
  socials: [
    {
      platform: "facebook",
      url: "https://facebook.com/johncruz",
    },
    {
      platform: "instagram",
      url: "https://instagram.com/johncruz",
    },
  ],
};

export default john;