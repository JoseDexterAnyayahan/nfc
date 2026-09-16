import type { BusinessProfile } from "@/lib/profiles";

import BusinessModern from "./templates/BusinessModern";
import BusinessBanner from "./templates/BusinessBanner";
import BusinessCoffee from "./templates/BusinessCoffee";
import BusinessOwners from "./templates/BusinessOwners";

export default function BusinessProfile({
  profile,
}: {
  profile: BusinessProfile;
}) {
  switch (profile.template) {
    case "modern":
      return <BusinessModern profile={profile} />;

    case "businessbanner":
      return <BusinessBanner profile={profile} />;

    case "businesscoffee":
      return <BusinessCoffee profile={profile} />;

    case "businessowners":
      return <BusinessOwners profile={profile} />;

    case "classic":
      return <BusinessModern profile={profile} />;

    case "minimal":
      return <BusinessModern profile={profile} />;

    default:
      return <BusinessModern profile={profile} />;
  }
}
