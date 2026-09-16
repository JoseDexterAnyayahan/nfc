import Image from "next/image";
import type { BusinessProfile } from "@/lib/profiles";
import SocialLinks from "../SocialLinks";
import ProfileActions from "../ProfileActions";

export default function BusinessModern({
  profile,
}: {
  profile: BusinessProfile;
}) {
  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Image
              src={profile.logo}
              alt={profile.businessName}
              width={140}
              height={140}
              className="rounded-2xl object-contain"
            />

            <h1 className="mt-5 text-2xl font-bold">
              {profile.businessName}
            </h1>

            {profile.tagline && (
              <p className="mt-1 text-muted-foreground">
                {profile.tagline}
              </p>
            )}

            <div className="mt-6 w-full">
              <ProfileActions
                email={profile.email}
                phone={profile.phone}
                website={profile.website}
                link={profile.link}
              />
            </div>

            <div className="mt-6">
              <SocialLinks socials={profile.socials} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}