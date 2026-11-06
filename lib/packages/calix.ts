export type CalixPackage = {
  id: string;
  name: string;
  price: number;
  inclusions: string[];
  description?: string;
};

export type CalixPackageGroup = {
  id: string;
  title: string;
  packages: CalixPackage[];
};

export type CalixCategory = {
  id: string;
  title: string;
  groups: CalixPackageGroup[];
};

export const calixPackages: CalixCategory[] = [
  // =====================================================
  // WEDDING PACKAGES
  // =====================================================
  {
    id: "wedding",
    title: "Wedding Packages",
    groups: [
      {
        id: "wedding-standard",
        title: "Wedding Package",
        packages: [
          {
            id: "wedding-base",
            name: "Base Package",
            price: 6000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
            ],
          },
          {
            id: "wedding-base-2-photographers",
            name: "Base Package 2",
            price: 9000,
            inclusions: [
              "2 photographers",
              "For more captures during the event",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
            ],
          },
          {
            id: "wedding-pro",
            name: "Pro Package",
            price: 16000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
              "1 videographer",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
          {
            id: "wedding-pro-max",
            name: "Pro Max Package",
            price: 22000,
            inclusions: [
              "2 photographers",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
              "2 videographers",
              "Semi-full video",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
        ],
      },

      // WEDDING BASE COMBO
      {
        id: "wedding-base-combo",
        title: "Wedding Base Combo Package",
        packages: [
          {
            id: "wedding-base-combo-1",
            name: "Base Combo Package 1",
            price: 15000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "8x10 album (20 pages)",
              "4R frame",
              "32GB flash drive",
            ],
          },
          {
            id: "wedding-base-combo-1-2-photographers",
            name: "Base Combo Package 1 (2 Photographers)",
            price: 18000,
            inclusions: [
              "2 photographers",
              "For more captures during the event",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "8x10 album (20 pages)",
              "4R frame",
              "32GB flash drive",
            ],
          },
          {
            id: "wedding-base-combo-2",
            name: "Base Combo Package 2",
            price: 17000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "10x10 album (20 pages)",
              "8R frame",
              "32GB flash drive",
            ],
          },
          {
            id: "wedding-base-combo-2-2-photographers",
            name: "Base Combo Package 2 (2 Photographers)",
            price: 20000,
            inclusions: [
              "2 photographers",
              "For more captures during the event",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "10x10 album (20 pages)",
              "8R frame",
              "32GB flash drive",
            ],
          },
          {
            id: "wedding-base-combo-3",
            name: "Base Combo Package 3",
            price: 21000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "10x10 album (40 pages)",
              "12x18 frame",
              "32GB flash drive",
            ],
          },
          {
            id: "wedding-base-combo-3-2-photographers",
            name: "Base Combo Package 3 (2 Photographers)",
            price: 24000,
            inclusions: [
              "2 photographers",
              "For more captures during the event",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "10x10 album (40 pages)",
              "12x18 frame",
              "32GB flash drive",
            ],
          },
        ],
      },

      // WEDDING PRO COMBO
      {
        id: "wedding-pro-combo",
        title: "Wedding Pro Combo Package",
        packages: [
          {
            id: "wedding-pro-combo-1",
            name: "Pro Combo Package 1",
            price: 20000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "32GB flash drive",
              "1 videographer",
              "Video highlights",
              "Prenuptial video",
              "With drone",
              "Video highlights uploaded",
            ],
          },
          {
            id: "wedding-pro-combo-2",
            name: "Pro Combo Package 2",
            price: 25000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "32GB flash drive",
              "2 videographers",
              "Prenuptial video",
              "Semi-full video",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
          {
            id: "wedding-pro-combo-3",
            name: "Pro Combo Package 3",
            price: 40000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "32GB flash drive",
              "Prenuptial video",
              "Same day edit video",
              "1 main camera",
              "1 creative camera",
              "1 editor",
              "1 assistant",
              "With drone",
            ],
          },
        ],
      },

      // WEDDING PRO MAX COMBO
      {
        id: "wedding-pro-max-combo",
        title: "Wedding Pro Max Combo Package",
        packages: [
          {
            id: "wedding-pro-max-combo-1",
            name: "Pro Max Combo Package 1",
            price: 25000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "8x10 album (20 pages)",
              "4R frame",
              "32GB flash drive",
              "1 videographer",
              "Video highlights",
              "Prenuptial video",
              "With drone",
              "Video highlights uploaded",
            ],
          },
          {
            id: "wedding-pro-max-combo-2",
            name: "Pro Max Combo Package 2",
            price: 30000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "10x10 album (20 pages)",
              "8R frame",
              "32GB flash drive",
              "2 videographers",
              "Prenuptial video",
              "Semi-full video",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
          {
            id: "wedding-pro-max-combo-3",
            name: "Pro Max Combo Package 3",
            price: 50000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "Prenuptial photos",
              "10x10 album (40 pages)",
              "12x18 frame",
              "32GB flash drive",
              "Prenuptial video",
              "Same day edit video",
              "1 main camera",
              "1 creative camera",
              "1 editor",
              "1 assistant",
              "With drone",
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // 18TH BIRTHDAY PACKAGES
  // =====================================================
  {
    id: "birthday",
    title: "18th Birthday Packages",
    groups: [
      {
        id: "birthday-standard",
        title: "18th Birthday Package",
        packages: [
          {
            id: "birthday-base",
            name: "Base Package",
            price: 5500,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
            ],
          },
          {
            id: "birthday-base-2-photographers",
            name: "Base Package 2",
            price: 8000,
            inclusions: [
              "2 photographers",
              "For more captures during the event",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
            ],
          },
          {
            id: "birthday-pro",
            name: "Pro Package",
            price: 15000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
              "1 videographer",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
          {
            id: "birthday-pro-max",
            name: "Pro Max Package",
            price: 20000,
            inclusions: [
              "2 photographers",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
              "2 videographers",
              "Semi-full video",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // KIDDIE PARTY PACKAGES
  // =====================================================
  {
    id: "kiddie",
    title: "Kiddie Party Packages",
    groups: [
      {
        id: "kiddie-standard",
        title: "Kiddie Party",
        packages: [
          {
            id: "kiddie-base",
            name: "Base Package",
            price: 4500,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
            ],
          },
          {
            id: "kiddie-base-2-photographers",
            name: "Base Package 2",
            price: 7000,
            inclusions: [
              "2 photographers",
              "For more captures during the event",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
            ],
          },
          {
            id: "kiddie-pro",
            name: "Pro Package",
            price: 15000,
            inclusions: [
              "1 photographer",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
              "1 videographer",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
          {
            id: "kiddie-pro-max",
            name: "Pro Max Package",
            price: 20000,
            inclusions: [
              "2 photographers",
              "Unlimited photo coverage",
              "All enhanced photos",
              "Highlights photos uploaded",
              "32GB flash drive",
              "2 videographers",
              "Semi-full video",
              "Video highlights",
              "With drone",
              "Video highlights uploaded",
            ],
          },
        ],
      },
    ],
  },
];

// =====================================================
// ADD-ONS
// =====================================================

export const calixAddOns = [
  {
    id: "prenup-photo",
    category: "Prenuptial",
    name: "Photo",
    price: 5000,
  },
  {
    id: "prenup-video",
    category: "Prenuptial",
    name: "Video",
    price: 6000,
  },
  {
    id: "prebirthday-photo",
    category: "Pre-Birthday",
    name: "Photo",
    price: 4000,
  },
  {
    id: "prebirthday-video",
    category: "Pre-Birthday",
    name: "Video",
    price: 5000,
  },
  {
    id: "same-day-edit",
    category: "Same Day Edit",
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
  },
];

// =====================================================
// ALBUMS
// =====================================================

export const calixAlbums = [
  {
    id: "album-10x10-40",
    name: "10x10 (40 Pages)",
    price: 8500,
  },
  {
    id: "album-10x10-20",
    name: "10x10 (20 Pages)",
    price: 6000,
  },
  {
    id: "album-8x10-40",
    name: "8x10 (40 Pages)",
    price: 7000,
  },
  {
    id: "album-8x10-20",
    name: "8x10 (20 Pages)",
    price: 5000,
  },
];

// =====================================================
// FRAMES
// =====================================================

export const calixFrames = [
  {
    id: "frame-4r",
    name: "4R",
    price: 350,
  },
  {
    id: "frame-5r",
    name: "5R",
    price: 400,
  },
  {
    id: "frame-8r",
    name: "8R",
    price: 500,
  },
  {
    id: "frame-11r",
    name: "11R",
    price: 900,
  },
  {
    id: "frame-12x18",
    name: "12x18",
    price: 1500,
  },
];
