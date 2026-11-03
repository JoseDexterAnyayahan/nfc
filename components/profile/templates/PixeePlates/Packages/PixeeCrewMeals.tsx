
"use client";

import { pixeeCrewMeals } from "@/lib/profiles/business/pixeeplates";

import PixeeServiceSection, {
  PixeeDetailList,
  PixeeSectionHeading,
  type PixeeServiceItem,
} from "./PixeeServiceSection";

const money = (price: number) =>
  `₱${price.toLocaleString("en-PH")}`;

const item: PixeeServiceItem = {
  id: "crew-meals",
  name: "Crew Meals",
  subtitle: `Minimum order: ${pixeeCrewMeals.minimumOrder} meals`,
  priceLabel: `Minimum ${pixeeCrewMeals.minimumOrder} orders`,
  thumbnail: pixeeCrewMeals.thumbnail,
  description:
    "Convenient meal options prepared for event crews, suppliers, and working teams.",
  details: (
    <>
      <div className="mt-7">
        <PixeeSectionHeading>Breakfast</PixeeSectionHeading>
        <p className="mb-3 text-xs leading-relaxed text-white/50">
          {pixeeCrewMeals.breakfast.description}
        </p>
        <PixeeDetailList
          title="Available Choices"
          items={pixeeCrewMeals.breakfast.choices}
        />
      </div>

      <div className="mt-8">
        <PixeeSectionHeading>Lunch and Dinner</PixeeSectionHeading>
        <p className="mb-4 text-xs leading-relaxed text-white/50">
          {pixeeCrewMeals.lunchDinner.description}
        </p>

        {(
          [
            ["Chicken", pixeeCrewMeals.lunchDinner.chicken],
            ["Pork", pixeeCrewMeals.lunchDinner.pork],
            ["Fish", pixeeCrewMeals.lunchDinner.fish],
          ] as const
        ).map(([category, meal]) => (
          <div
            key={category}
            className="mb-4 rounded-xl border border-white/10 bg-white/[0.025] p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h5 className="font-semibold text-white">{category}</h5>
              <span className="text-sm font-semibold text-[#e2c47d]">
                {money(meal.price)}
              </span>
            </div>

            <PixeeDetailList
              title="Available Choices"
              items={meal.choices}
            />
          </div>
        ))}

        <PixeeDetailList
          title="Available Side Dishes"
          items={pixeeCrewMeals.lunchDinner.sides}
        />
      </div>

      <div className="mt-8">
        <PixeeSectionHeading>Optional Add-ons</PixeeSectionHeading>

        {pixeeCrewMeals.optionalAddons.map((addon) => (
          <div
            key={addon.name}
            className="rounded-xl border border-[#c9a45c]/20 bg-white/[0.025] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h5 className="font-semibold text-white">{addon.name}</h5>
              <span className="text-sm font-semibold text-[#e2c47d]">
                {money(addon.price)} {addon.priceUnit}
              </span>
            </div>

            <PixeeDetailList
              title="Available Choices"
              items={addon.choices}
            />
          </div>
        ))}
      </div>

      <PixeeDetailList
        title="Additional Information"
        items={pixeeCrewMeals.notes}
      />
    </>
  ),
};

export default function PixeeCrewMeals() {
  return (
    <PixeeServiceSection
      id="crew-meals"
      title={pixeeCrewMeals.title}
      description="Meal options for your event crew, suppliers, and working team."
      items={[item]}
    />
  );
}
