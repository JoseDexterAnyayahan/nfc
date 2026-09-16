import type { PersonalProfile } from "@/lib/profiles";
import PersonalModern from "./templates/PersonalModern";
import PersonalDossier from "./templates/Personaldossier";
import PersonalPremium from "./templates/PersonalPremium ";

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

    case "dossier":
      return <PersonalDossier profile={profile} />;

    case "premium":
      return <PersonalPremium profile={profile} />;

    default:
      return <PersonalModern profile={profile} />;
  }
}
