import type { BusinessProfile } from "@/lib/profiles";

import BusinessBanner from "./templates/BusinessBanner";
import BusinessCoffee from "./templates/BusinessCoffee";
import BusinessOwners from "./templates/BusinessOwners";
import BusinessNfc from "./templates/BusinessNfc";
import AuguriTemplate from "./templates/auguri/AuguriTemplate";

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

    default:
      return <BusinessBanner profile={profile} />;
  }
}
