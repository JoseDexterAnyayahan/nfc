
import { pixeePackages } from "@/lib/profiles/business/pixeeplates";
import PixeePackageCard from "./PixeePackageCard";

const pkg = pixeePackages.find((item) => item.id === "vogue-booth");

export default function PixeeVogueBooth() {
  if (!pkg) return null;
  return <PixeePackageCard pkg={pkg} />;
}
