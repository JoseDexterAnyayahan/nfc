import { notFound } from "next/navigation";
import BusinessProfile from "@/components/profile/BusinessProfile";
import { getBusinessProfile } from "@/lib/profiles";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = getBusinessProfile(id);

  if (!profile) {
    notFound();
  }

  return <BusinessProfile profile={profile} />;
}