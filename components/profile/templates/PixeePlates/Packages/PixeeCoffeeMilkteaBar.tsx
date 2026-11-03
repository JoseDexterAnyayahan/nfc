
"use client";

import { pixeeCoffeeMilkteaBar } from "@/lib/profiles/business/pixeeplates";

import PixeeServiceSection, {
  PixeeDetailList,
  PixeeSectionHeading,
  type PixeeServiceItem,
} from "./PixeeServiceSection";

const money = (price: number) =>
  `₱${price.toLocaleString("en-PH")}`;

const items: PixeeServiceItem[] = pixeeCoffeeMilkteaBar.packages.map(
  (pkg) => ({
    id: pkg.id,
    name: pkg.name,
    subtitle: pkg.subtitle,
    priceLabel: money(pkg.price),
    thumbnail: pkg.thumbnail,
    description: `${pkg.duration} • ${pkg.cups} cups`,
    details: (
      <>
        <div className="mt-7 rounded-xl border border-[#c9a45c]/20 bg-white/[0.025] p-4">
          <PixeeSectionHeading>Package Details</PixeeSectionHeading>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                Service duration
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {pkg.duration}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                Number of cups
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {pkg.cups} cups
              </p>
            </div>
          </div>

          <p className="mt-4 text-xl font-semibold text-[#e2c47d]">
            {money(pkg.price)}
          </p>
        </div>

        <PixeeDetailList
          title="Package Inclusions"
          items={pkg.inclusions}
        />

        <PixeeDetailList
          title="Optional Add-ons"
          items={pkg.optionalAddons}
        />

        <PixeeDetailList
          title="Freebies"
          items={pkg.free}
        />
      </>
    ),
  }),
);

export default function PixeeCoffeeMilkteaBar() {
  return (
    <PixeeServiceSection
      id="coffee-milktea-bar"
      title={pixeeCoffeeMilkteaBar.title}
      description="Give your guests a refreshing coffee and milktea experience during your celebration."
      items={items}
    />
  );
}
