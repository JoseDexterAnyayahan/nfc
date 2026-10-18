import {
  FaArrowRight,
  FaCheckCircle,
  FaRegBuilding,
  FaRegHandshake,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import {
  tamtechContainerClass,
  tamtechSectionClass,
} from "./tamtech-styles";

type Props = {
  profile: BusinessProfile;
};

const COMPANY_NAME = "Tamaraw Technohub Inc.";
const DEFAULT_CONTACT = "Wendell Lozano";
const DEFAULT_TITLE = "Operations Manager";
const DEFAULT_WEBSITE = "https://tamtechhub.com/";

const defaultServices = [
  {
    name: "Virtual Assistance",
    description: "Administrative and operational support.",
  },
  {
    name: "Customer Service",
    description: "Customer communication and support.",
  },
  {
    name: "Business Support",
    description: "Support for everyday business processes.",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874E8] focus-visible:ring-offset-2";

export default function TamtechAbout({ profile }: Props) {
  const services = profile.services?.length
    ? profile.services
    : defaultServices;

  const contactName = profile.contactName || DEFAULT_CONTACT;
  const contactTitle = profile.contactTitle || DEFAULT_TITLE;
  const website = profile.website || DEFAULT_WEBSITE;

  const bio =
    profile.bio ||
    `Connect with ${contactName}, ${contactTitle} at ${COMPANY_NAME}, for professional inquiries and business connections.`;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`${tamtechSectionClass} scroll-mt-24 bg-white`}
    >
      <div className={tamtechContainerClass}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          {/* Story */}
          <div className="min-w-0 lg:sticky lg:top-24">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0874E8]/10 text-[#0874E8]"
            >
              <FaRegBuilding size={21} />
            </span>

            <p className="mt-6 text-sm font-semibold text-[#168D6B]">
              About {contactName.split(/\s+/)[0]}
            </p>

            <h2
              id="about-heading"
              className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-[#172B45] sm:text-4xl"
            >
              Professional connections.
              <span className="block text-[#0874E8]">
                Practical solutions.
              </span>
            </h2>

            <p className="mt-5 max-w-xl whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {bio}
            </p>

            {/* Role summary */}
            <dl className="mt-6 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E1EAF4] bg-[#E1EAF4] text-sm sm:grid-cols-2">
              <div className="bg-[#F6FAFF] px-4 py-3">
                <dt className="text-xs font-medium text-slate-500">Role</dt>
                <dd className="mt-0.5 font-bold text-[#172B45]">
                  {contactTitle}
                </dd>
              </div>
              <div className="bg-[#F6FAFF] px-4 py-3">
                <dt className="text-xs font-medium text-slate-500">Company</dt>
                <dd className="mt-0.5 font-bold text-[#172B45]">
                  {COMPANY_NAME}
                </dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0874E8] px-6 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-[#0558B5] active:scale-[0.98] ${focusRing}`}
              >
                Get in touch
                <FaArrowRight size={12} aria-hidden="true" />
              </a>

              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#E1EAF4] bg-white px-6 text-sm font-bold text-[#0874E8] transition hover:border-[#0874E8] hover:bg-[#F6FAFF] active:scale-[0.98] ${focusRing}`}
              >
                Company website
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="min-w-0 rounded-3xl border border-[#E1EAF4] bg-[#F6FAFF] p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#42CDA5]/15 text-[#168D6B]"
              >
                <FaRegHandshake size={19} />
              </span>

              <div className="min-w-0">
                <h3 className="text-lg font-extrabold text-[#172B45]">
                  How we can help
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Services and support areas offered through Tamaraw
                  Technohub.
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {services.map((service, index) => (
                <li
                  key={`${service.name}-${index}`}
                  className="flex gap-3 rounded-2xl border border-[#E1EAF4] bg-white p-4 transition hover:border-[#42CDA5] hover:shadow-sm sm:p-5"
                >
                  <FaCheckCircle
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#25AF87]"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#172B45] sm:text-base">
                      {service.name}
                    </p>
                    {service.description && (
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {service.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-slate-600">
              Not sure what you need?{" "}
              <a
                href="#contact"
                className={`rounded font-bold text-[#0874E8] underline-offset-4 hover:underline ${focusRing}`}
              >
                Send a message
              </a>{" "}
              and we&apos;ll point you in the right direction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}