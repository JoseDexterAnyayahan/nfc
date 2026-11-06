import { notFound } from "next/navigation";
import { getBusinessProfile } from "@/lib/profiles";
import { calixPackages } from "@/lib/packages/calix";
import PackageCategory from "@/components/profile/templates/calix-films/package/PackageCategory";

type Props = {
  params: Promise<{
    id: string;
    category: string;
  }>;
};

export default async function PackagePage({ params }: Props) {
  const { id, category: categoryId } = await params;

  const profile = getBusinessProfile(id);

  if (!profile || profile.template !== "calix-films") {
    notFound();
  }

  const category = calixPackages.find(
    (item) => item.id === categoryId
  );

  if (!category) {
    notFound();
  }

  return (
    <PackageCategory
      category={category}
      profileId={profile.id}
    />
  );
}