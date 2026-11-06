import Image from "next/image";
import type { BusinessProfile } from "@/lib/profiles";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { calixClasses } from "./style";

type Props = {
  profile: BusinessProfile;
};

export default function Featured({ profile }: Props) {
  const highlights = profile.highlights || [];

  return (
    <section className={`${calixClasses.section} bg-[#031319]`}>
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B89553]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D6B779]">
              Our Portfolio
            </p>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B89553]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#B89553] via-[#F0DDA8] to-[#B89553] bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#C0A08E]/65">
            A collection of moments, emotions, and stories captured through our
            lens.
          </p>
        </div>

        {/* Featured cards */}
        {highlights.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => {
              const card = (
                <>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#262B28]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="scale-125 object-cover transition duration-700 group-hover:scale-120"
                    />

                    {/* Cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031319] via-[#031319]/10 to-transparent opacity-90" />

                    {/* Golden frame */}
                    <div className="pointer-events-none absolute inset-3 border border-[#D6B779]/25 transition duration-500 group-hover:inset-4 group-hover:border-[#E5CD91]/60" />

                    {/* Number */}
                    <span className="absolute right-7 top-7 text-xs font-semibold tracking-[0.2em] text-[#E5CD91]">
                      0{index + 1}
                    </span>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <div className="mb-4 h-px w-9 bg-[#D6B779] transition-all duration-500 group-hover:w-16" />

                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>

                      {item.caption && (
                        <p className="mt-3 text-sm leading-6 text-[#E5D9C8]/70">
                          {item.caption}
                        </p>
                      )}

                      {item.url && (
                        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E5CD91]">
                          View Project
                          <FaArrowUpRightFromSquare size={10} />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );

              const className =
                "group block overflow-hidden border border-[#D6B779]/15 bg-[#262B28] transition duration-500 hover:-translate-y-1 hover:border-[#D6B779]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)]";

              return item.url ? (
                <a
                  key={`${item.title}-${index}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title}`}
                  className={className}
                >
                  {card}
                </a>
              ) : (
                <div key={`${item.title}-${index}`} className={className}>
                  {card}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm text-[#C0A08E]/45">
            Featured works will be added soon.
          </p>
        )}

        {/* Bottom accent */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#B89553]/40" />
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C0A08E]/40">
            Captured with passion
          </p>
          <span className="h-px w-8 bg-[#B89553]/40" />
        </div>
      </div>
    </section>
  );
}
