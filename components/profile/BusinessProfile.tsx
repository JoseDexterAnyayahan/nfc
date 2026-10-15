import type { BusinessProfile } from "@/lib/profiles";

import BusinessBanner from "./templates/BusinessBanner";
import BusinessCoffee from "./templates/BusinessCoffee";
import BusinessOwners from "./templates/BusinessOwners";
import BusinessNfc from "./templates/BusinessNfc";
import AuguriTemplate from "./templates/auguri/AuguriTemplate";
import ChinaBankProfessional from "./templates/china-bank/ChinaBankProfessional";
import KntoKlsk from "./templates/knto-klsk/KntoKlsk";
import LitratoCafe from "./templates/litrato-cafe/LitratoCafe";

export default function BusinessProfile({
  profile,
}: {
  profile: BusinessProfile;
}) {
  switch (profile.template) {
    case "businessbanner":
      return <BusinessBanner profile={profile} />;

    case "businesscoffee":
      return <BusinessCoffee profile={profile} />;

    case "businessowners":
      return <BusinessOwners profile={profile} />;

    case "businessnfc":
      return <BusinessNfc profile={profile} />;

    case "auguri":
      return <AuguriTemplate profile={profile} />;

    case "professional":
      return <ChinaBankProfessional profile={profile} />;

    case "kntoklsk":
      return <KntoKlsk profile={profile} />;

    case "litrato-cafe":
      return <LitratoCafe profile={profile} />;

    default:
      return <BusinessBanner profile={profile} />;
  }
}
