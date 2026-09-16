import {
  ExternalLink,
  Globe,
  Mail,
  Phone,
} from "lucide-react";

type Props = {
  email: string;
  phone: string;
  website?: string;
  link?: string;
};

export default function ProfileActions({
  email,
  phone,
  website,
  link,
}: Props) {
  return (
    <div className="grid gap-3">
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-muted"
      >
        <Mail className="h-5 w-5" />
        <span>{email}</span>
      </a>

      <a
        href={`tel:${phone}`}
        className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-muted"
      >
        <Phone className="h-5 w-5" />
        <span>{phone}</span>
      </a>

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-muted"
        >
          <Globe className="h-5 w-5" />
          <span>Website</span>
        </a>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-muted"
        >
          <ExternalLink className="h-5 w-5" />
          <span>Visit Link</span>
        </a>
      )}
    </div>
  );
}