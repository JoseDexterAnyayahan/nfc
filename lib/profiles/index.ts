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

export type PersonalProfile = {
  id: string;

  type: "personal";

  template:
    | "premium"
    | "personalsocial";

  name: string;
  title?: string;
  company?: string;

  avatar: string;

  email: string;
  phone: string;
  whatsapp?: string;

  website?: string;

  location?: string;
  locationUrl?: string;

  socials?: Social[];
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

import murdochAssociates from "./business/murdoch-associates";
import suarezFarms from "./business/suarez-farms";
import dextap from "./business/dextap";
import dextapV2 from "./business/dextap-v2";

const personalProfiles: PersonalProfile[] = [
  cel,
  dex,
];

const businessProfiles: BusinessProfile[] = [
  murdochAssociates,
  suarezFarms,
  dextap,
  dextapV2,
];

export function getPersonalProfile(id: string) {
  return personalProfiles.find(
    (profile) => profile.id === id,
  );
}

export function getBusinessProfile(id: string) {
  return businessProfiles.find(
    (profile) => profile.id === id,
  );
}