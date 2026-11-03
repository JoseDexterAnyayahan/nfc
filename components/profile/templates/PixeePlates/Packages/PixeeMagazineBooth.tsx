
import { pixeePackages } from "@/lib/profiles/business/pixeeplates";
import PixeePackageCard from "./PixeePackageCard";

const pkg = pixeePackages.find((item) => item.id === "magazine-booth");

export default function PixeeMagazineBooth() {
  if (!pkg) return null;
  return <PixeePackageCard pkg={pkg} />;
}
