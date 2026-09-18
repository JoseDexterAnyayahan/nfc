export type Social = {
  platform:
    | "facebook"
    | "instagram"
    | "tiktok"
    | "linkedin"
    | "youtube"
    | "whatsapp"
    | "x";
  url: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  videoUrl?: string;
  description?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  message: string;
  avatar?: string;
  rating?: number;
};

export type ProfileService = {
  name: string;
  description?: string;
};

export type DentistResult = {
  before: string;
  after: string;
  title?: string;
  description?: string;
};

export type DentistCredential = {
  title: string;
  institution?: string;
};

export type PersonalProfile = {
  id: string;
  type: "personal";

  template:
    | "premium"
    | "personalsocial"
    | "videographer"
    | "insurance"
    | "dentist";

  name: string;
  title?: string;
  company?: string;

  avatar: string;
  banner?: string;

  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;

  location?: string;
  locationUrl?: string;

  socials?: Social[];

  bio?: string;

  services?: ProfileService[];

  portfolio?: PortfolioItem[];

  testimonials?: Testimonial[];

  dentistResults?: DentistResult[];

  dentistCredentials?: DentistCredential[];
};

export type BusinessProfile = {
  id: string;
  type: "business";

  template:
    | "businessbanner"
    | "businesscoffee"
    | "businessowners"
    | "businessnfc";

  businessName: string;
  tagline?: string;

  logo: string;
  banner?: string;
  avatar?: string;

  contactName?: string;
  contactTitle?: string;

  email: string;
  phone: string;
  whatsapp?: string;

  website?: string;
  link?: string;

  location?: string;
  locationUrl?: string;

  reviewUrl?: string;

  socials?: Social[];

  bio?: string;

  services?: {
    name: string;
    description?: string;
  }[];

  hours?: string;
};

import cel from "./personal/cel";
import dex from "./personal/dex";
import dexVideographer from "./personal/dex-videographer";
import insuranceAgent from "./personal/insurance-agent";
import dentistProfile from "./personal/dentist";
import murdochAssociates from "./business/murdoch-associates";
import suarezFarms from "./business/suarez-farms";
import dextap from "./business/dextap";
import dextapV2 from "./business/dextap-v2";

const personalProfiles: PersonalProfile[] = [
  cel,
  dex,
  dexVideographer,
  insuranceAgent,
  dentistProfile,
];

const businessProfiles: BusinessProfile[] = [
  murdochAssociates,
  suarezFarms,
  dextap,
  dextapV2,
];

export function getPersonalProfile(id: string) {
  return personalProfiles.find((profile) => profile.id === id);
}

export function getBusinessProfile(id: string) {
  return businessProfiles.find((profile) => profile.id === id);
}
