
import {
  FaClipboardCheck,
  FaComments,
  FaHandshake,
  FaArrowRight,
  FaRegCalendarCheck,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import {
  suzukiContainerClass,
  suzukiSectionClass,
} from "./suzuki-styles";

type Props = {
  profile: BusinessProfile;
};

const defaultServices = [
  {
    name: "Service Inquiries",
    description:
      "Get in touch with questions about vehicle servicing and available assistance.",
    icon: FaComments,
  },
  {
    name: "Service Coordination",
    description:
      "Discuss your service concerns and coordinate the appropriate next steps.",
    icon: FaRegCalendarCheck,
  },
  {
    name: "Customer Assistance",
    description:
      "Receive guidance on service-related questions and dealership concerns.",
    icon: FaClipboardCheck,
  },
];

const strengths = [
  {
    title: "Personal Assistance",
    description:
      "A direct point of contact for your service-related concerns.",
    icon: FaHandshake,
    accent: "blue",
  },
  {
    title: "Clear Communication",
    description:
      "A convenient way to ask questions and discuss your needs.",
    icon: FaComments,
    accent: "red",
  },
  {
    title: "Service Guidance",
    description:
      "Help understanding the next steps for your service inquiry.",
    icon: FaClipboardCheck,
    accent: "blue",
  },
];

export default function SuzukiAbout({ profile }: Props) {
  const services = profile.services?.length
    ? profile.services.map((service, index) => ({
        ...service,
        icon: defaultServices[index % defaultServices.length].icon,
      }))
    : defaultServices;

  return (
    <section
      id="about"
      className={`${suzukiSectionClass} scroll-mt-24 bg-[var(--suzuki-card)]`}
    >
      <div className={suzukiContainerClass}>
        {/* Introduction */}
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-[var(--suzuki-red)]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--suzuki-blue)]">
                A little about me
              </p>
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-[var(--suzuki-text)] sm:text-4xl">
              Making your service experience
              <span className="text-[var(--suzuki-blue)]">
                {" "}simpler.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="text-sm leading-7 text-[var(--suzuki-muted)] sm:text-base">
              {profile.bio ||
                `I'm ${profile.contactName || profile.businessName}, a ${
                  profile.contactTitle || "Service Advisor"
                } at Suzuki Auto Calapan. I'm here to help with service-related inquiries, communicate the next steps, and provide a convenient point of contact for your concerns.`}
            </p>
          </div>
        </div>

        {/* Professional strengths */}
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item) => {
            const Icon = item.icon;
            const isRed = item.accent === "red";

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--suzuki-border)] bg-[var(--suzuki-surface)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--suzuki-blue)] hover:shadow-lg hover:shadow-black/[0.04] sm:p-6"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                    isRed
                      ? "bg-[var(--suzuki-red)]/10 text-[var(--suzuki-red)]"
                      : "bg-[var(--suzuki-blue)]/10 text-[var(--suzuki-blue)]"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <h3 className="text-base font-semibold text-[var(--suzuki-text)]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--suzuki-muted)]">
                  {item.description}
                </p>

                <span
                  className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-300 group-hover:w-full ${
                    isRed
                      ? "bg-[var(--suzuki-red)]"
                      : "bg-[var(--suzuki-blue)]"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Services */}
        <div className="mt-12">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--suzuki-red)]">
                How I can help
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--suzuki-text)] sm:text-3xl">
                Here for your service needs.
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[var(--suzuki-muted)]">
              Reach out to discuss your concerns and find out what to do next.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--suzuki-border)] bg-[var(--suzuki-surface)]">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.name}
                  className={`group flex gap-4 p-5 transition-colors hover:bg-[var(--suzuki-blue)]/[0.035] sm:gap-5 sm:p-6 ${
                    index !== services.length - 1
                      ? "border-b border-[var(--suzuki-border)]"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--suzuki-card)] text-[var(--suzuki-blue)] ring-1 ring-[var(--suzuki-border)] transition-colors group-hover:bg-[var(--suzuki-blue)] group-hover:text-white">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-[var(--suzuki-text)]">
                      {service.name}
                    </h4>

                    {service.description && (
                      <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--suzuki-muted)]">
                        {service.description}
                      </p>
                    )}
                  </div>

                  <span className="hidden shrink-0 items-center text-[var(--suzuki-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--suzuki-blue)] sm:flex">
                    <FaArrowRight size={13} />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Subtle closing statement */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--suzuki-border)] bg-[var(--suzuki-page)] p-4 sm:items-center sm:p-5">
            <span className="h-9 w-1 shrink-0 rounded-full bg-[var(--suzuki-red)]" />

            <p className="text-sm leading-6 text-[var(--suzuki-muted)]">
              Every inquiry starts with a conversation. Feel free to get in
              touch whenever you need assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
