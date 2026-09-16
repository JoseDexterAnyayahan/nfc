export type Social = {
  platform: "facebook" | "instagram" | "tiktok" | "linkedin" | "youtube" | "x";

  url: string;
};

export type PersonalProfile = {
  id: string;

  type: "personal";

  template:
    | "modern"
    | "dossier"
    | "personalpremium"
    | "premium"
    | "classic"
    | "minimal";

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
    | "modern"
    | "businessbanner"
    | "businesscoffee"
    | "classic"
    | "minimal";

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
};

import john from "./personal/john";
import jd from "./personal/jd";
import cel from "./personal/cel";
import maria from "./personal/maria";

import abcRealty from "./business/abc-realty";
import xyzStudio from "./business/xyz-studio";
import murdochAssociates from "./business/murdoch-associates";
import suarezFarms from "./business/suarez-farms";

const personalProfiles: PersonalProfile[] = [john, jd, cel, maria];

const businessProfiles: BusinessProfile[] = [
  abcRealty,
  xyzStudio,
  murdochAssociates,
  suarezFarms,
];

export function getPersonalProfile(id: string) {
  return personalProfiles.find((profile) => profile.id === id);
}

export function getBusinessProfile(id: string) {
  return businessProfiles.find((profile) => profile.id === id);
}
