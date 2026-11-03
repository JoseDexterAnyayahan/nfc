
import { pixeePackages } from "@/lib/profiles/business/pixeeplates";
import PixeePackageCard from "./PixeePackageCard";

const pkg = pixeePackages.find((item) => item.id === "redbox");

export default function PixeeRedbox() {
  if (!pkg) return null;
  return <PixeePackageCard pkg={pkg} />;
}
