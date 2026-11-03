
"use client";

import { pixeePerfumeBar } from "@/lib/profiles/business/pixeeplates";
import PixeeServiceSection, {
  PixeeDetailList,
  PixeeSectionHeading,
  type PixeeServiceItem,
} from "./PixeeServiceSection";

const money = (price: number) => `₱${price.toLocaleString("en-PH")}`;

const item: PixeeServiceItem = {
  id: "perfume-bar",
  name: "Perfume Bar",
  subtitle: "Personalized fragrance experience",
  priceLabel: `Starts at ${money(pixeePerfumeBar.startingPrice)}`,
  thumbnail: pixeePerfumeBar.thumbnail,
  description:
    "A personalized fragrance experience where guests can choose their preferred scent and take home their own perfume souvenir.",
  details: (
    <>
      <div className="mt-7">
        <PixeeSectionHeading>Available Bottle Sizes and Rates</PixeeSectionHeading>
        <p className="mb-4 text-xs text-white/45">
          Choose a bottle size and guest count to see the corresponding package rate.
        </p>
        <div className="space-y-4">
          {pixeePerfumeBar.sizes.map((tier) => (
            <div key={tier.size} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
              <h5 className="mb-4 text-lg font-semibold text-white">{tier.size}</h5>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {tier.rates.map((rate) => (
                  <div key={`${tier.size}-${rate.guests}`} className="rounded-xl border border-white/5 bg-black/30 p-3">
                    <p className="text-[10px] text-white/45">{rate.guests} guests</p>
                    <p className="mt-2 text-sm font-semibold text-[#e2c47d]">{money(rate.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PixeeDetailList title="70-Pax Package Inclusions" items={pixeePerfumeBar.packageDetails.pax70.inclusions} />
      <PixeeDetailList title="70-Pax Optional Add-ons" items={pixeePerfumeBar.packageDetails.pax70.optionalAddons} />
      <PixeeDetailList title="100-Pax Package Inclusions" items={pixeePerfumeBar.packageDetails.pax100.inclusions} />
      <PixeeDetailList title="100-Pax Optional Add-ons" items={pixeePerfumeBar.packageDetails.pax100.optionalAddons} />
    </>
  ),
};

export default function PixeePerfumeBar() {
  return (
    <PixeeServiceSection
      id="perfume-bar"
      title="Perfume Bar"
      description="A personalized fragrance experience for your guests."
      items={[item]}
    />
  );
}
