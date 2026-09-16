import {
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  email: string;
  phone: string;

  website?: string;
  link?: string;

  /** Optional WhatsApp number */
  whatsapp?: string;

  /** Optional location text */
  location?: string;

  /** Optional Google Maps or other location URL */
  locationUrl?: string;

  /** Optional custom labels */
  emailLabel?: string;
  phoneLabel?: string;
  websiteLabel?: string;
  linkLabel?: string;
  whatsappLabel?: string;
  locationLabel?: string;

  /**
   * Optional extra classes applied to each row — lets a template
   * override colors (border, hover bg, text) without touching the
   * default look every other template already relies on.
   */
  className?: string;
};

export default function ProfileActions({
  email,
  phone,
  website,
  link,
  whatsapp,
  location,
  locationUrl,

  emailLabel = "Email",
  phoneLabel = "Phone",
  websiteLabel = "Website",
  linkLabel = "Visit Link",
  whatsappLabel = "WhatsApp",
  locationLabel = "Location",

  className,
}: Props) {
  const rowClass = (extra?: string) =>
    cn(
      "flex items-center gap-3 rounded-xl border p-4 transition hover:bg-muted",
      className,
      extra
    );

  const whatsappNumber = whatsapp?.replace(/\D/g, "");

  return (
    <div className="grid gap-3">
      {/* Email */}
      <a
        href={`mailto:${email}`}
        className={rowClass()}
      >
        <Mail className="h-5 w-5 shrink-0" />

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {emailLabel}
          </p>

          <span className="block truncate">
            {email}
          </span>
        </div>
      </a>

      {/* Phone */}
      <a
        href={`tel:${phone}`}
        className={rowClass()}
      >
        <Phone className="h-5 w-5 shrink-0" />

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {phoneLabel}
          </p>

          <span className="block truncate">
            {phone}
          </span>
        </div>
      </a>

      {/* WhatsApp */}
      {whatsapp && whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass()}
        >
          <MessageCircle className="h-5 w-5 shrink-0" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {whatsappLabel}
            </p>

            <span className="block truncate">
              {whatsapp}
            </span>
          </div>
        </a>
      )}

      {/* Website */}
      {website && (
        <a
          href={
            website.startsWith("http")
              ? website
              : `https://${website}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass()}
        >
          <Globe className="h-5 w-5 shrink-0" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {websiteLabel}
            </p>

            <span className="block truncate">
              {website.replace(/^https?:\/\//, "")}
            </span>
          </div>
        </a>
      )}

      {/* Location */}
      {location && (
        <a
          href={locationUrl || "#"}
          target={locationUrl ? "_blank" : undefined}
          rel={locationUrl ? "noopener noreferrer" : undefined}
          onClick={!locationUrl ? (e) => e.preventDefault() : undefined}
          className={rowClass()}
        >
          <MapPin className="h-5 w-5 shrink-0" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {locationLabel}
            </p>

            <span className="block truncate">
              {location}
            </span>
          </div>
        </a>
      )}

      {/* Generic external link */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass()}
        >
          <ExternalLink className="h-5 w-5 shrink-0" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {linkLabel}
            </p>

            <span className="block truncate">
              {link}
            </span>
          </div>
        </a>
      )}
    </div>
  );
}