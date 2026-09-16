export type Social = {
  platform:
    | "facebook"
    | "instagram"
    | "tiktok"
    | "linkedin"
    | "youtube"
    | "x";
  url: string;
};

export type PersonalProfile = {
  id: string;
  type: "personal";
  template: "modern" | "classic" | "minimal";
  name: string;
  title?: string;
  avatar: string;
  email: string;
  phone: string;
  website?: string;
  socials?: Social[];
};

export type BusinessProfile = {
  id: string;
  type: "business";
  template: "modern" | "classic" | "minimal";
  businessName: string;
  tagline?: string;
  logo: string;
  email: string;
  phone: string;
  website?: string;
  link?: string;
  socials?: Social[];
};

import john from "./personal/john";
import maria from "./personal/maria";

import abcRealty from "./business/abc-realty";
import xyzStudio from "./business/xyz-studio";

const personalProfiles: PersonalProfile[] = [
  john,
  maria,
];

const businessProfiles: BusinessProfile[] = [
  abcRealty,
  xyzStudio,
];

export function getPersonalProfile(id: string) {
  return personalProfiles.find((profile) => profile.id === id);
}

export function getBusinessProfile(id: string) {
  return businessProfiles.find((profile) => profile.id === id);
}