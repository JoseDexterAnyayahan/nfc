
"use client";

import { pixeeFrozenCocktails } from "@/lib/profiles/business/pixeeplates";

import PixeeServiceSection, {
  PixeeDetailList,
  PixeeRateGrid,
  PixeeSectionHeading,
  type PixeeServiceItem,
} from "./PixeeServiceSection";

const items: PixeeServiceItem[] = pixeeFrozenCocktails.packages.map((pkg) => {
  return {
    id: `frozen-${pkg.id}`,
    name: pkg.name,
    subtitle: pkg.description,
    thumbnail: pkg.thumbnail,
    priceLabel: pkg.rates.every((rate) => rate.price === null)
      ? "Inquire for rates"
      : "Packages available",
    description: `${pkg.description}. Choose from our available drink flavors for your event.`,
    details: (
      <>
        <div className="mt-7">
          <PixeeSectionHeading>Package Rates</PixeeSectionHeading>
          <PixeeRateGrid rates={pkg.rates} />
        </div>

        {pkg.id !== "mocktails" && (
          <PixeeDetailList
            title="Available Cocktail Flavors"
            items={pixeeFrozenCocktails.flavorSelection.cocktails}
          />
        )}

        {pkg.id !== "cocktails" && (
          <PixeeDetailList
            title="Available Mocktail Flavors"
            items={pixeeFrozenCocktails.flavorSelection.mocktails}
          />
        )}

        <PixeeDetailList
          title="Optional Add-ons"
          items={pixeeFrozenCocktails.addOns}
        />

        <PixeeDetailList
          title="Special Offers"
          items={pixeeFrozenCocktails.specialOffers}
        />

        <PixeeDetailList
          title="Shared Inclusions"
          items={pixeeFrozenCocktails.sharedInclusions}
        />

        <PixeeDetailList
          title="Additional Information"
          items={pixeeFrozenCocktails.notes}
        />
      </>
    ),
  };
});

export default function PixeeFrozenCocktails() {
  return (
    <PixeeServiceSection
      id="frozen-cocktails"
      title={pixeeFrozenCocktails.title}
      description="Refresh your celebration with our frozen cocktails, mocktails, and slushie selections."
      items={items}
    />
  );
}
