import { notFound } from "next/navigation";
import PersonalProfile from "@/components/profile/PersonalProfile";
import { getPersonalProfile } from "@/lib/profiles";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = getPersonalProfile(id);

  if (!profile) {
    notFound();
  }

  return <PersonalProfile profile={profile} />;
}