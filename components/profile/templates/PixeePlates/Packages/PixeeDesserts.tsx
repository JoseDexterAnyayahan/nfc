
"use client";

import { pixeeDesserts } from "@/lib/profiles/business/pixeeplates";
import PixeeServiceSection, {
  PixeeDetailList,
  PixeeRateGrid,
  PixeeSectionHeading,
  type PixeeServiceItem,
} from "./PixeeServiceSection";

const money = (price: number) => `₱${price.toLocaleString("en-PH")}`;

const items: PixeeServiceItem[] = pixeeDesserts.packages.map((pkg) => {
  const rates = "rates" in pkg ? pkg.rates : undefined;
  const rate = "rate" in pkg ? pkg.rate : undefined;
  const rateUnit = "rateUnit" in pkg ? pkg.rateUnit : undefined;
  const minimumOrder = "minimumOrder" in pkg ? pkg.minimumOrder : undefined;
  const subtitle = "description" in pkg ? pkg.description : undefined;

  return {
    id: `dessert-${pkg.id}`,
    name: pkg.name,
    subtitle,
    priceLabel:
      rates
        ? "Packages available"
        : typeof rate === "number"
          ? `${money(rate)} per ${rateUnit ?? "item"}`
          : "Inquire for rates",
    thumbnail: pkg.thumbnail,
    description: subtitle ?? "A sweet addition to your event celebration.",
    details: (
      <>
        {rates && (
          <div className="mt-7">
            <PixeeSectionHeading>Package Rates</PixeeSectionHeading>
            <PixeeRateGrid rates={rates} />
          </div>
        )}

        {typeof rate === "number" && (
          <div className="mt-7 rounded-xl border border-[#c9a45c]/20 bg-white/[0.025] p-4">
            <PixeeSectionHeading>Price</PixeeSectionHeading>
            <p className="text-xl font-semibold text-[#e2c47d]">
              {money(rate)}
              <span className="ml-2 text-xs font-normal text-white/45">
                per {rateUnit ?? "item"}
              </span>
            </p>

            {minimumOrder && (
              <p className="mt-2 text-xs text-white/55">
                Minimum order: {minimumOrder}
              </p>
            )}
          </div>
        )}

        <PixeeDetailList
          title="Shared Inclusions"
          items={pixeeDesserts.sharedInclusions}
        />

        <PixeeDetailList
          title="Additional Information"
          items={pixeeDesserts.notes}
        />
      </>
    ),
  };
});

export default function PixeeDesserts() {
  return (
    <PixeeServiceSection
      id="desserts"
      title={pixeeDesserts.title}
      description="Add a sweet touch to your celebration with our dessert selections."
      items={items}
    />
  );
}
