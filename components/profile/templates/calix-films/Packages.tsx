import Link from "next/link";
import Image from "next/image";
import type { BusinessProfile } from "@/lib/profiles";
import { FaArrowRight, FaCamera, FaVideo, FaImages } from "react-icons/fa6";
import { calixClasses } from "./style";

type Props = {
  profile: BusinessProfile;
};

const categories = [
  {
    id: "wedding",
    title: "Wedding",
    description: "Preserve every moment of your special day.",
    number: "01",
    label: "Timeless Moments",
  },
  {
    id: "birthday",
    title: "18th Birthday",
    description: "Capture the memories of your milestone celebration.",
    number: "02",
    label: "A Milestone to Remember",
  },
  {
    id: "kiddie",
    title: "Kiddie Party",
    description: "Keep the smiles and special moments unforgettable.",
    number: "03",
    label: "Little Moments, Big Memories",
  },
];

const addOns = [
  {
    category: "Prenuptial",
    label: "For Your Journey Together",
    items: [
      { name: "Prenuptial Photo", price: 5000 },
      { name: "Prenuptial Video", price: 6000 },
    ],
  },
  {
    category: "Pre-Birthday",
    label: "Before the Celebration",
    items: [
      { name: "Pre-Birthday Photo", price: 4000 },
      { name: "Pre-Birthday Video", price: 5000 },
    ],
  },
];

const sameDayEdit = {
  name: "Same Day Edit Video",
  price: 25000,
  inclusions: [
    "Same day edit video",
    "1 main camera",
    "1 creative camera",
    "1 editor",
    "1 assistant",
    "With drone",
  ],
};

const albums = [
  { name: "10x10 Album", pages: "40 Pages", price: 8500 },
  { name: "10x10 Album", pages: "20 Pages", price: 6000 },
  { name: "8x10 Album", pages: "40 Pages", price: 7000 },
  { name: "8x10 Album", pages: "20 Pages", price: 5000 },
];

const frames = [
  { name: "4R Frame", price: 350 },
  { name: "5R Frame", price: 400 },
  { name: "8R Frame", price: 500 },
  { name: "11R Frame", price: 900 },
  { name: "12x18 Frame", price: 1500 },
];

const gold = "#D6B779";
const champagne = "#E5CD91";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B89553]" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D6B779] sm:text-xs">
          {eyebrow}
        </p>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B89553]" />
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#C0A08E]/60">
        {description}
      </p>
    </div>
  );
}

function Price({ amount }: { amount: number }) {
  return (
    <span className="whitespace-nowrap text-lg font-bold tabular-nums text-[#E5CD91]">
      ₱{amount.toLocaleString("en-PH")}
    </span>
  );
}

function PriceRow({
  name,
  price,
  index,
  description,
}: {
  name: string;
  price: number;
  index?: number;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#D6B779]/10 py-4 last:border-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        {index !== undefined && (
          <span className="text-[10px] font-semibold tracking-wider text-[#B89553]">
            0{index + 1}
          </span>
        )}

        <div className="min-w-0">
          <p className="text-sm font-medium text-[#E5D9C8]">{name}</p>
          {description && (
            <p className="mt-1 text-xs text-[#C0A08E]/45">{description}</p>
          )}
        </div>
      </div>

      <Price amount={price} />
    </div>
  );
}

export default function Packages({ profile }: Props) {
  return (
    <section className={`${calixClasses.section} relative overflow-hidden bg-[#262B28]`}>
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#B89553]/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* MAIN PACKAGES */}
        <SectionHeading
          eyebrow="Find Your Package"
          title="Our Packages"
          description="Every celebration deserves to be captured beautifully. Choose the coverage that best suits your occasion."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/b/${profile.id}/packages/${category.id}`}
              className="group block overflow-hidden border border-[#D6B779]/15 bg-[#031319] transition duration-500 hover:-translate-y-1 hover:border-[#D6B779]/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#262B28]">
                {profile.packageBanners?.[category.id] && (
                  <Image
                    src={profile.packageBanners[category.id]}
                    alt={`${category.title} photography`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="scale-120 object-cover transition duration-700 group-hover:scale-[1.18]"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#031319] via-[#031319]/25 to-transparent" />

                <div className="absolute inset-3 border border-[#D6B779]/25 transition duration-500 group-hover:inset-4 group-hover:border-[#E5CD91]/60" />

                <div className="absolute left-7 top-7">
                  <span className="text-xs font-semibold tracking-[0.25em] text-[#E5CD91]">
                    {category.number}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#D6B779]">
                    {category.label}
                  </p>

                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#E5D9C8]/65">
                    {category.description}
                  </p>

                  <div className="mt-7 flex items-center justify-between border-t border-white/20 pt-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E5CD91]">
                      Explore Packages
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center border border-[#D6B779]/40 text-[#E5CD91] transition duration-300 group-hover:border-[#D6B779] group-hover:bg-[#D6B779] group-hover:text-[#031319]">
                      <FaArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ADDITIONAL SERVICES */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Customize Your Experience"
            title="Additional Services"
            description="Add more memories and coverage to complement your chosen package."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {addOns.map((group, index) => (
              <div
                key={group.category}
                className="border border-[#D6B779]/15 bg-[#031319] p-6 transition duration-300 hover:border-[#D6B779]/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.25em] text-[#B89553]">
                      0{index + 1}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-[#E5CD91]">
                      {group.category}
                    </h3>

                    <p className="mt-2 text-xs text-[#C0A08E]/45">
                      {group.label}
                    </p>
                  </div>

                  <FaCamera className="mt-1 text-lg text-[#B89553]/70" />
                </div>

                <div className="mt-5">
                  {group.items.map((item) => (
                    <PriceRow
                      key={item.name}
                      name={item.name}
                      price={item.price}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* SAME DAY EDIT */}
            <div className="relative overflow-hidden border border-[#B89553]/40 bg-gradient-to-br from-[#031319] to-[#262B28] p-6">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#B89553]/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <FaVideo className="text-xl text-[#D6B779]" />

                  <span className="border border-[#D6B779]/30 bg-[#D6B779]/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-[#E5CD91]">
                    Video
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {sameDayEdit.name}
                </h3>

                <div className="mt-3">
                  <Price amount={sameDayEdit.price} />
                </div>

                <div className="mt-6 space-y-3">
                  {sameDayEdit.inclusions.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-xs text-[#C0A08E]/70"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#D6B779]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ALBUMS AND FRAMES */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Keep Your Memories"
            title="Albums & Frames"
            description="Turn your favorite photographs into beautiful keepsakes you can hold, display, and treasure."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* ALBUMS */}
            <div className="border border-[#D6B779]/15 bg-[#031319] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FaImages className="text-xl text-[#D6B779]" />
                  <h3 className="text-xl font-bold text-white">
                    Photo Albums
                  </h3>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B89553]">
                  04 Options
                </span>
              </div>

              <p className="mt-3 text-xs leading-6 text-[#C0A08E]/50">
                Choose your preferred album size and number of pages.
              </p>

              <div className="mt-5">
                {albums.map((album, index) => (
                  <PriceRow
                    key={`${album.name}-${album.pages}`}
                    name={album.name}
                    description={album.pages}
                    price={album.price}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* FRAMES */}
            <div className="border border-[#D6B779]/15 bg-[#031319] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FaCamera className="text-xl text-[#D6B779]" />
                  <h3 className="text-xl font-bold text-white">
                    Photo Frames
                  </h3>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B89553]">
                  05 Options
                </span>
              </div>

              <p className="mt-3 text-xs leading-6 text-[#C0A08E]/50">
                Display your favorite moments in a beautiful frame.
              </p>

              <div className="mt-5">
                {frames.map((frame, index) => (
                  <PriceRow
                    key={frame.name}
                    name={frame.name}
                    price={frame.price}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTNOTE */}
        <div className="mt-16 border-t border-[#D6B779]/15 pt-8 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#D6B779]/60">
            Every moment deserves to be remembered
          </p>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[#C0A08E]/45">
            For package inquiries, additional services, and customization,
            please contact CALIX FILMS AND PHOTOGRAPHY.
          </p>
        </div>
      </div>
    </section>
  );
}
