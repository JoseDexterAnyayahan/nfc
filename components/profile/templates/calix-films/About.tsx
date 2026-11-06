import type { BusinessProfile } from "@/lib/profiles";
import { calixClasses } from "./style";

type Props = {
  profile: BusinessProfile;
};

export default function About({ profile }: Props) {
  return (
    <section className={`${calixClasses.section} bg-[#262B28]`}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#996D51]">
          Get to know us
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          About Us
        </h2>

        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#996D51]" />

        <p className="mt-8 text-base leading-8 text-[#C0A08E]/75 md:text-lg">
          {profile.bio ||
            "We capture meaningful moments through photography and videography."}
        </p>
      </div>
    </section>
  );
}