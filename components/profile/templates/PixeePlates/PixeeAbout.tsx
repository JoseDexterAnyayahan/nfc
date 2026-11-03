
export default function PixeeAbout() {
  return (
    <section className="relative overflow-hidden py-10 text-center sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        {/* Section label */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#c9a45c]/50" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d6b56d]">
            The PIXEEPLATES Experience
          </span>
          <span className="h-px w-8 bg-[#c9a45c]/50" />
        </div>

        {/* Tagline */}
        <h2 className="text-2xl font-semibold leading-snug tracking-wide text-white sm:text-3xl">
          Turning Moments
          <br />
          <span className="text-[#d6b56d]">into Magic.</span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
          Bringing style, fun, and elegance to every celebration through
          thoughtfully curated event services.
        </p>

        {/* Minimal accent */}
        <div className="mt-6 flex items-center justify-center">
          <span className="h-1 w-1 rotate-45 bg-[#d6b56d]" />
        </div>
      </div>
    </section>
  );
}
