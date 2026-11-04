
import type { BusinessProfile } from "@/lib/profiles";

const escapeVCard = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Unable to read profile photo."));
        return;
      }

      resolve(reader.result.split(",")[1]);
    };

    reader.onerror = () =>
      reject(new Error("Unable to convert profile photo."));

    reader.readAsDataURL(blob);
  });

const getNameParts = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: "",
    };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
};

const getPhotoData = async (avatar: string) => {
  const photoUrl = new URL(avatar, window.location.origin);

  const response = await fetch(photoUrl.toString());

  if (!response.ok) {
    throw new Error("Unable to load profile photo.");
  }

  const photoBlob = await response.blob();

  let finalBlob = photoBlob;

  // Convert WebP to JPEG for better contact-app compatibility.
  if (photoBlob.type.toLowerCase().includes("webp")) {
    const imageBitmap = await createImageBitmap(photoBlob);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to process profile photo.");
    }

    context.drawImage(imageBitmap, 0, 0);

    imageBitmap.close();

    finalBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Unable to convert profile photo."));
        },
        "image/jpeg",
        0.92
      );
    });
  }

  const mime = finalBlob.type.toLowerCase();

  const photoType = mime.includes("jpeg")
    ? "JPEG"
    : mime.includes("png")
      ? "PNG"
      : "";

  if (!photoType) {
    throw new Error("Profile photo must be JPEG or PNG.");
  }

  return {
    base64: await blobToBase64(finalBlob),
    photoType,
  };
};

export async function saveGhieContact(profile: BusinessProfile) {
  const name = profile.contactName?.trim() || profile.businessName?.trim() || "Rosalie Ghie F. Larracas";

  const { firstName, lastName } = getNameParts(name);

  const organization = "Rotary Club of Pinamalayan Central";
  const position = profile.contactTitle?.trim() || "Past President";

  const phone = profile.phone?.trim() || "";
  const email = profile.email?.trim() || "";
  const address = profile.location?.trim() || "";

  const currentUrl = window.location.href;

  let photoLine = "";

  // Only profile.avatar is used for the saved contact photo.
  if (profile.avatar) {
    const { base64, photoType } = await getPhotoData(profile.avatar);

    photoLine = `PHOTO;ENCODING=b;TYPE=${photoType}:${base64}`;
  }

  const socialLines = (profile.socials || [])
    .filter((social) => social.url?.trim())
    .map(
      (social) =>
        `X-SOCIALPROFILE;TYPE=${escapeVCard(social.platform)}:${escapeVCard(social.url)}`
    );

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",

    `FN:${escapeVCard(name)}`,
    `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,

    `ORG:${escapeVCard(organization)}`,
    `TITLE:${escapeVCard(position)}`,

    phone ? `TEL;TYPE=CELL,VOICE:${escapeVCard(phone)}` : "",

    email
      ? `EMAIL;TYPE=INTERNET,WORK:${escapeVCard(email)}`
      : "",

    address
      ? `ADR;TYPE=WORK:;;${escapeVCard(address)};;;;`
      : "",

    `URL:${escapeVCard(currentUrl)}`,

    `NOTE:${escapeVCard("Create Lasting Impacts | Viber: " + phone)}`,

    ...socialLines,

    photoLine,

    "END:VCARD",
  ].filter(Boolean);

  const vCard = lines.join("\r\n") + "\r\n";

  const blob = new Blob([vCard], {
    type: "text/vcard;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Rosalie-Ghie-Larracas.vcf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
