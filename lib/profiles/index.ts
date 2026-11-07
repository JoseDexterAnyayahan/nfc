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

export type BusinessHighlight = {
  src: string;
  title: string;
  caption: string;
  url: string;
};

export type BusinessProfile = {
  id: string;
  type: "business";
  template:
    | "businessbanner"
    | "businesscoffee"
    | "businessowners"
    | "businessnfc"
    | "auguri"
    | "kntoklsk"
    | "professional"
    | "litrato-cafe"
    | "suzuki-advisor"
    | "tamtech-wendell"
    | "pixeeplates"
    | "ghie-larracas"
    | "calix-films"
    | "rbs-ghie";

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
  businessSocials?: Social[];
  packageBanners?: Record<string, string>;
  featuredBanner?: string;
  bio?: string;

  services?: {
    name: string;
    description?: string;
  }[];

  hours?: string;

  // Litrato Café featured gallery
  highlights?: BusinessHighlight[];
  seeMoreUrl?: string;
};

// Personal profiles
import cel from "./personal/cel";
import dex from "./personal/dex";
import dexVideographer from "./personal/dex-videographer";
import insuranceAgent from "./personal/insurance-agent";
import dentistProfile from "./personal/dentist";

// Business profiles
import murdochAssociates from "./business/murdoch-associates";
import suarezFarms from "./business/suarez-farms";
import dextap from "./business/dextap";
import dextapV2 from "./business/dextap-v2";
import auguri from "./business/auguri";
import gioManalo from "./business/gio-manalo";
import kntoKlsk from "./business/knto-klsk";
import litratoCafe from "./business/litrato-cafe";
import tamtechWendell from "./business/tamtech-wendell";
import pixeeplates from "./business/pixeeplates";
import { suzukiAdvisorProfile } from "./business/suzuki-advisor";
import { ghieLarracas } from "./business/ghie-larracas";
import calixFilms from "./business/calix-films";
import rbsGhie from "./business/rbs-Ghie";

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
  auguri,
  gioManalo,
  kntoKlsk,
  litratoCafe,
  suzukiAdvisorProfile,
  tamtechWendell,
  ghieLarracas,
  pixeeplates,
  calixFilms,
  rbsGhie,
];

export function getPersonalProfile(id: string) {
  return personalProfiles.find((profile) => profile.id === id);
}

export function getBusinessProfile(id: string) {
  return businessProfiles.find((profile) => profile.id === id);
}
