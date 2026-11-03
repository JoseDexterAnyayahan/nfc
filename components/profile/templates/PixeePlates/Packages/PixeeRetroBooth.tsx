
import { pixeePackages } from "@/lib/profiles/business/pixeeplates";
import PixeePackageCard from "./PixeePackageCard";

const pkg = pixeePackages.find((item) => item.id === "retro-booth");

export default function PixeeRetroBooth() {
  if (!pkg) return null;
  return <PixeePackageCard pkg={pkg} />;
}
