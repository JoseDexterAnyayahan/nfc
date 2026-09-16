import Image from "next/image";
import type { PersonalProfile } from "@/lib/profiles";
import SocialLinks from "../SocialLinks";
import ProfileActions from "../ProfileActions";

export default function PersonalModern({
  profile,
}: {
  profile: PersonalProfile;
}) {
  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />

            <h1 className="mt-5 text-2xl font-bold">
              {profile.name}
            </h1>

            {profile.title && (
              <p className="mt-1 text-muted-foreground">
                {profile.title}
              </p>
            )}

            <div className="mt-6 w-full">
              <ProfileActions
                email={profile.email}
                phone={profile.phone}
                website={profile.website}
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