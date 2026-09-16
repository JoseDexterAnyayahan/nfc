import type { PersonalProfile } from "@/lib/profiles";
import PersonalModern from "./templates/PersonalModern";

export default function PersonalProfile({
  profile,
}: {
  profile: PersonalProfile;
}) {
  switch (profile.template) {
    case "modern":
      return <PersonalModern profile={profile} />;

    case "classic":
      return <PersonalModern profile={profile} />;

    case "minimal":
      return <PersonalModern profile={profile} />;

    default:
      return <PersonalModern profile={profile} />;
  }
}