import type { PersonalProfile } from "@/lib/profiles";
import PersonalPremium from "./templates/PersonalPremium ";
import PersonalSocial from "./templates/PersonalSocial";
export default function PersonalProfile({
  profile,
}: {
  profile: PersonalProfile;
}) {
  switch (profile.template) {
    case "premium":
      return <PersonalPremium profile={profile} />;

    case "personalsocial":
      return <PersonalSocial profile={profile} />;

    default:
      return <PersonalPremium profile={profile} />;
  }
}
