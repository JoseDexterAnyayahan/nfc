import type { BusinessProfile } from "@/lib/profiles";
import BusinessModern from "./templates/BusinessModern";

export default function BusinessProfile({
  profile,
}: {
  profile: BusinessProfile;
}) {
  switch (profile.template) {
    case "modern":
      return <BusinessModern profile={profile} />;

    case "classic":
      return <BusinessModern profile={profile} />;

    case "minimal":
      return <BusinessModern profile={profile} />;

    default:
      return <BusinessModern profile={profile} />;
  }
}