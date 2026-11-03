
import { pixeePackages } from "@/lib/profiles/business/pixeeplates";
import PixeePackageCard from "./PixeePackageCard";

const pkg = pixeePackages.find((item) => item.id === "video-guestbook");

export default function PixeeVideoGuestbook() {
  if (!pkg) return null;
  return <PixeePackageCard pkg={pkg} />;
}
