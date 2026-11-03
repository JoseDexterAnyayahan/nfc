
"use client";

import { pixeeGrazingTable } from "@/lib/profiles/business/pixeeplates";
import PixeeServiceSection, {
  PixeeDetailList,
  PixeeRateGrid,
  PixeeSectionHeading,
  type PixeeServiceItem,
} from "./PixeeServiceSection";

const item: PixeeServiceItem = {
  id: "grazing-table",
  name: "Grazing Table",
  subtitle: "Pica-Pica and Slider Packages",
  priceLabel: "Packages available",
  thumbnail: pixeeGrazingTable.thumbnail,
  description:
    "A curated selection of snacks, desserts, and refreshments for your celebration.",
  details: (
    <>
      <div className="mt-7">
        <PixeeSectionHeading>Available Grazing Packages</PixeeSectionHeading>
        <div className="space-y-4">
          {pixeeGrazingTable.packages.map((pkg) => (
            <div key={pkg.id} className="overflow-hidden rounded-2xl border border-[#c9a45c]/20 bg-white/[0.025]">
              <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                <h5 className="font-semibold text-white">{pkg.name}</h5>
              </div>
              <div className="p-4 sm:p-5">
                <PixeeRateGrid rates={pkg.rates} />
                <PixeeDetailList title="Package Inclusions" items={pkg.inclusions} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <PixeeDetailList title="Shared Inclusions" items={pixeeGrazingTable.sharedInclusions} />
      <PixeeDetailList title="Additional Information" items={pixeeGrazingTable.sharedNotes} />
    </>
  ),
};

export default function PixeeGrazingTable() {
  return (
    <PixeeServiceSection
      id="grazing-table"
      title="Grazing Table"
      description="A curated spread of pica-pica, sliders, and refreshments for your event."
      items={[item]}
    />
  );
}
