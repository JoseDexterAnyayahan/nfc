import type { PersonalProfile } from "@/lib/profiles";
import PersonalPremium from "./templates/PersonalPremium ";
import PersonalSocial from "./templates/PersonalSocial";
import VideographerTemplate from "./templates/videographer/VideographerTemplate";
import InsuranceTemplate from "./templates/insurance/InsuranceTemplate";
import DentistTemplate from "./templates/dentists/DentistTemplate.tsx";

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

    case "videographer":
      return <VideographerTemplate profile={profile} />;

    case "insurance":
      return <InsuranceTemplate profile={profile} />;

    case "dentist":
      return <DentistTemplate profile={profile} />;

    default:
      return <PersonalPremium profile={profile} />;
  }
}
