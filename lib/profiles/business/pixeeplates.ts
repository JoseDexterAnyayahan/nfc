import type { BusinessProfile } from "@/lib/profiles";
import type { PixeePackage } from "@/components/profile/templates/PixeePlates/pixeeplates.types";

export const pixeePhoneNumbers = ["09276284453"];

const noTransportationCalapan = "No transportation fee within Calapan area.";

const grazingTableNotes = [
  "1 hour set-up plus 2 hours serving time.",
  "Transportation fee is calculated based on the distance of your venue from our commissary.",
];

export const pixeePackages: PixeePackage[] = [
  {
    id: "retro-booth",
    name: "Retro Booth",
    price: 5000,
    thumbnail: "/profiles/business/pixeeplates/packages/retro-booth.jpeg",
    description: "A retro-inspired photobooth experience for your event.",
    inclusions: [
      "Unlimited use of photobooth for 2 hours",
      "Photostrip QR code with downloadable images",
      "Retro-themed photobooth setup",
      "Wide-angle mirrorless camera with live view touchscreen",
      "Customized photo layout (choice of 4R or 2 x 6 photostrip)",
      "2 copies per session for 2 x 6 photostrip, or 1 copy per session for 4R photocard",
      "On-site staff personnel",
      "Fun props for everyone",
      noTransportationCalapan,
    ],
    optionalAddons: [
      "Additional hour – ₱1,000/hour",
      "Magnetic Strip (Unlimited) – ₱600",
      "Full Magnetic (Unlimited) – ₱1,250",
      "Photostrip frame – ₱750",
    ],
    free: ["Photo album (for 2 x 6 photostrip)"],
  },
  {
    id: "redbox",
    name: "Redbox",
    subtitle: "Look Up (0.5x) Photobooth",
    price: 9500,
    thumbnail: "/profiles/business/pixeeplates/packages/redbox.jpeg",
    description: "A Korean-inspired 0.5x photobooth experience.",
    inclusions: [
      "Unlimited use of photobooth for 2 hours",
      "Photostrip QR code with downloadable images",
      "Stylish Korean-inspired photobooth",
      "Wide-angle mirrorless camera with live view touchscreen",
      "Customized photo layout (choice of 4R or 2 x 6 photostrip)",
      "2 copies per session for 2 x 6 photostrip, or 1 copy per session for 4R photocard",
      "On-site staff personnel",
      noTransportationCalapan,
    ],
    optionalAddons: [
      "Additional hour – ₱1,500/hour",
      "Magnetic Strip (Unlimited) – ₱600",
      "Full Magnetic (Unlimited) – ₱1,250",
      "Photostrip frame – ₱750",
      "Selfie Mirror – starts at ₱1,000",
    ],
  },
  {
    id: "vogue-booth",
    name: "Vogue Booth",
    price: 13500,
    thumbnail: "/profiles/business/pixeeplates/packages/vogue-booth.jpeg",
    description: "A stylish photobooth experience with an LED Vogue backdrop.",
    inclusions: [
      "Unlimited shots for 2 hours",
      "Wide-angle mirrorless camera",
      "LED Vogue backdrop",
      "Customized photo layout",
      "Video GIF / QR code with downloadable images",
      "1 copy of 4R photocard per session",
      "Softcopies will be sent via Google Drive",
      "On-site staff personnel",
      "Fun props for everyone",
      "Red carpet entry",
      noTransportationCalapan,
    ],
    optionalAddons: [
      "Additional hour – ₱2,000/hour",
      "Magnetic Strip (Unlimited) – ₱600",
      "Full Magnetic (Unlimited) – ₱1,250",
      "Photostrip frame – ₱750",
    ],
    free: ["Selfie Mirror with simple layout"],
  },
  {
    id: "magazine-booth",
    name: "Magazine Booth",
    price: 15500,
    thumbnail: "/profiles/business/pixeeplates/packages/magazine-booth.jpeg",
    description: "A magazine-inspired photo experience for special occasions.",
    inclusions: [
      "Unlimited shots for 2 hours",
      "Wide-angle mirrorless camera",
      "Life-size magazine-style enclosure",
      "Customized magazine-cover template",
      "1 copy of 4R photocard per session",
      "Softcopies will be sent via Google Drive",
      "On-site staff personnel",
      "Fun props for everyone",
      "Red carpet entry",
      noTransportationCalapan,
    ],
    optionalAddons: [
      "Additional hour – ₱2,000/hour",
      "Magnetic Strip – ₱600",
      "Full Magnetic – ₱1,250",
      "Photostrip frame – ₱750",
    ],
    free: ["Selfie Mirror with simple layout"],
  },
  {
    id: "video-guestbook",
    name: "Video Guestbook",
    price: 4000,
    thumbnail: "/profiles/business/pixeeplates/packages/video-guestbook.jpeg",
    description:
      "Preserve heartfelt messages and video greetings from your guests.",
    inclusions: [
      "2-hour rental",
      "Unlimited video greetings",
      "Welcome mirror with customized decals",
      "Video booth setup with flowers matching your color motif",
      "Highlight video of the consolidated video greetings",
      "All raw files shared via Google Drive",
      "2 event assistants on-site",
      noTransportationCalapan,
    ],
    optionalAddons: ["Extra hour – ₱1,000/hour"],
    specialOffer: [
      "Get the Video Guestbook for ₱3,500 when bundled with another package.",
    ],
  },
];

export const pixeePerfumeBar = {
  startingPrice: 7000,
  thumbnail: "/profiles/business/pixeeplates/packages/perfume-bar.jpeg",

  sizes: [
    {
      size: "10ml",
      rates: [
        { guests: 70, price: 7000 },
        { guests: 100, price: 10000 },
        { guests: 150, price: 15000 },
        { guests: 200, price: 20000 },
      ],
    },
    {
      size: "30ml",
      rates: [
        { guests: 70, price: 11550 },
        { guests: 100, price: 16500 },
        { guests: 150, price: 24750 },
        { guests: 200, price: 33000 },
      ],
    },
    {
      size: "50ml",
      rates: [
        { guests: 70, price: 17500 },
        { guests: 100, price: 25000 },
        { guests: 150, price: 37500 },
        { guests: 200, price: 50000 },
      ],
    },
  ],

  packageDetails: {
    pax70: {
      inclusions: [
        "3 hours aesthetic, minimalist, and interactive perfume bar setup",
        "Own choice of scents for the availed package",
        "30% oil concentration perfume that lasts up to 24 hours",
        "Souvenir bottle with drawstring bag",
        "Claim stubs for guaranteed number of guests",
        "Friendly and uniformed attendants to assist during the event",
        "Personalized layout (initials monogram)",
        noTransportationCalapan,
        "4 Tower Scents (2 scents for men and 2 scents for women)",
        "Free 10ml perfume gift for the celebrant (own choice of scent)",
      ],
      optionalAddons: [
        "Additional bottles upon request with additional charge depending on size (minimum 20 bottles)",
      ],
    },

    pax100: {
      inclusions: [
        "3 hours aesthetic, minimalist, and interactive perfume bar setup",
        "Own choice of scents for the availed package",
        "30% oil concentration perfume that lasts up to 24 hours",
        "Souvenir bottle with drawstring bag",
        "Claim stubs for guaranteed number of guests",
        "Friendly and uniformed attendants to assist during the event",
        "Personalized layout (initials monogram)",
        noTransportationCalapan,
        "Welcome Selfie Mirror with simple layout",
        "6 Tower Scents (3 scents for men and 3 scents for women)",
        "Free 30ml perfume gift for the celebrant (own choice of scent)",
      ],
      optionalAddons: [
        "Additional bottles upon request with additional charge depending on size (minimum 20 bottles)",
      ],
    },
  },
};

export const pixeeGrazingTable = {
  title: "Grazing Table",
  thumbnail: "/profiles/business/pixeeplates/packages/grazing-table.jpeg",

  // Kept for compatibility with the existing Grazing Table component.
  inclusions: [
    "Servers",
    "Long table",
    "Table cloth",
    "Wooden boards",
    "Décors",
    "Set-up and styling",
    "Disposable plates and cutleries",
    "Table napkin",
  ],
  guests: "",
  rate: "",
  others: [
    "1 hour set-up plus 2 hours serving time.",
    "Transportation fee is calculated based on the distance of your venue from our commissary.",
  ],
  notes: grazingTableNotes.join(" "),

  packages: [
    {
      id: "premium-pica-pica",
      name: "Premium Pica-Pica",
      rates: [
        { guests: 50, price: 9000 },
        { guests: 70, price: 11500 },
        { guests: 100, price: 14500 },
        { guests: 150, price: 19000 },
        { guests: 200, price: 23000 },
      ],
      inclusions: [
        "Dunkin' Donuts",
        "Chocolate fountain / dessert",
        "Cheese",
        "Nacho chips with dip",
        "Mixed nuts",
        "Biscuit, brownies, and wafer",
        "Fruits in season",
        "Flavored juice",
      ],
    },
    {
      id: "classic-pica-pica",
      name: "Classic Pica-Pica",
      rates: [
        { guests: 50, price: 7500 },
        { guests: 70, price: 9500 },
        { guests: 100, price: 12000 },
        { guests: 150, price: 16000 },
        { guests: 200, price: 19000 },
      ],
      inclusions: [
        "Dunkin' Donuts",
        "Cookies and crinkles",
        "Nacho chips",
        "Pretzel and mallows",
        "Mixed nuts",
        "Biscuit, brownies, wafer, pretzel, and mallows",
        "Fruits in season (2 kinds)",
        "Flavored juice",
      ],
    },
    {
      id: "slider",
      name: "Slider",
      rates: [
        { guests: 50, price: 10500 },
        { guests: 70, price: 12500 },
        { guests: 100, price: 15000 },
        { guests: 150, price: 19000 },
        { guests: 200, price: 23000 },
      ],
      inclusions: [
        "Dunkin' Donuts",
        "Mini burger",
        "Mini hotdog sandwich",
        "Mini ham and cheese sandwich",
        "Brownies and cookies",
        "Nacho chips with dip (salsa and cheese)",
        "Mixed nuts",
        "Fruits in season (1 kind)",
        "Flavored juice",
      ],
    },
  ],

  sharedInclusions: [
    "Servers",
    "Long table",
    "Table cloth",
    "Wooden boards",
    "Décors",
    "Set-up and styling",
    "Disposable plates and cutleries",
    "Table napkin",
  ],
  sharedNotes: grazingTableNotes,
};

export const pixeeFrozenCocktails = {
  title: "Frozen Cocktails + Slushies",

  packages: [
    {
      id: "cocktails",
      name: "Cocktails",
      thumbnail: "/profiles/business/pixeeplates/packages/cocktailsss.jpeg",
      description: "Alcoholic – 2 flavors",
      rates: [
        { guests: 50, price: null },
        { guests: 70, price: null },
        { guests: 100, price: null },
        { guests: 150, price: null },
        { guests: 200, price: null },
      ],
    },
    {
      id: "mocktails",
      name: "Mocktails",
      thumbnail: "/profiles/business/pixeeplates/packages/mocktails.jpeg",
      description: "Non-alcoholic – 2 flavors",
      rates: [
        { guests: 50, price: 8500 },
        { guests: 70, price: 11000 },
        { guests: 100, price: 15000 },
        { guests: 150, price: 18000 },
        { guests: 200, price: 20000 },
      ],
    },
    {
      id: "mixed",
      name: "Mixed",
      thumbnail: "/profiles/business/pixeeplates/packages/mixed.jpeg",
      description: "Cocktails and Mocktails – 2 flavors",
      rates: [
        { guests: 50, price: 10000 },
        { guests: 70, price: 13000 },
        { guests: 100, price: 16000 },
        { guests: 150, price: 19000 },
        { guests: 200, price: 22500 },
      ],
    },
  ],

  flavorSelection: {
    cocktails: [
      "Piña Colada",
      "Mojito",
      "Tequila Sunrise",
      "Classic Margarita",
      "Sangria",
    ],
    mocktails: [
      "Tropical Pineapple",
      "Blue Lagoon",
      "Citrus Punch",
      "Green Apple",
      "Mellow Melon",
      "Bubblegum",
      "Mango",
      "Strawberry",
    ],
  },

  addOns: ["Extra cocktail flavor – ₱3,000", "Extra mocktail flavor – ₱4,500"],

  specialOffers: [
    "Free extra flavor for events with 150–200 guests.",
    "Custom recipe branded for your event (quotation upon request).",
  ],

  sharedInclusions: [
    "Free complimentary treats: gummy candies",
    "Servers",
    "Long table",
    "Table cloth",
    "Wooden boards",
    "Décors",
    "Set-up and styling",
    "Disposable plates and cutleries",
    "Table napkin",
  ],

  notes: grazingTableNotes,
};

export const pixeeDesserts = {
  title: "Desserts",

  packages: [
    {
      id: "mini-leche-flan",
      name: "Mini Leche Flan",
      thumbnail: "/profiles/business/pixeeplates/packages/mini-leche-flan.jpeg",
      rates: [
        { guests: 50, price: 2500 },
        { guests: 70, price: 3500 },
        { guests: 100, price: 5000 },
        { guests: 150, price: null },
        { guests: 200, price: null },
      ],
    },
    {
      id: "leche-flan",
      name: "Leche Flan",
      thumbnail: "/profiles/business/pixeeplates/packages/leche-flan.jpeg",
      description: "Regular tub size",
      minimumOrder: "10 tubs",
      rate: 120,
      rateUnit: "per tub",
    },
    {
      id: "coffee-jelly",
      name: "Coffee Jelly",
      thumbnail: "/profiles/business/pixeeplates/packages/coffee-jelly.jpeg",
      rates: [
        { guests: 50, price: 1750 },
        { guests: 70, price: 2450 },
        { guests: 100, price: 3500 },
        { guests: 150, price: 5250 },
        { guests: 200, price: 7000 },
      ],
    },
    {
      id: "cheesecake",
      name: "Cheesecake",
      thumbnail: "/profiles/business/pixeeplates/packages/cheesecake.jpeg",
      description: "50ml cup size",
      minimumOrder: "20 cups",
      rate: 90,
      rateUnit: "per cup",
    },
  ],

  sharedInclusions: [
    "Servers",
    "Long table",
    "Table cloth",
    "Wooden boards",
    "Décors",
    "Set-up and styling",
    "Disposable plates and cutleries",
    "Table napkin",
  ],

  notes: grazingTableNotes,
};

export const pixeeCrewMeals = {
  title: "Crew Meals",
  minimumOrder: 28,
  thumbnail: "/profiles/business/pixeeplates/packages/crew-meals.jpeg",

  breakfast: {
    description: "Served with egg, 1 cup of rice, and bottled water.",
    choices: ["Tocino", "Longganisa", "Corned Beef", "Fried Boneless Bangus"],
  },

  lunchDinner: {
    description:
      "Served with choice of side, 1 cup of rice, and bottled water.",

    chicken: {
      price: 120,
      choices: [
        "2 pcs. Fried Chicken",
        "Chicken Cordon Bleu",
        "Chicken Adobo",
        "Chicken Afritada",
        "Chicken Tinola",
        "Chicken Lumpia",
      ],
    },

    pork: {
      price: 130,
      choices: [
        "Bistek",
        "Caldereta",
        "Menudo",
        "Pochero",
        "Adobo",
        "Hamonado",
        "Lechon Paksiw",
        "Sweet and Sour Pork",
        "Kare-Kare",
        "Fried Pork Chop",
        "Pork Lumpiang Shanghai",
      ],
    },

    fish: {
      price: 120,
      choices: ["Sweet and Sour Fish", "Fish Fillet"],
    },

    sides: [
      "Torta",
      "Ginisang Ampalaya with Egg",
      "Chopsuey",
      "Fresh Lumpiang Gulay",
      "Pinakbet",
    ],
  },

  optionalAddons: [
    {
      name: "Dessert",
      price: 15,
      priceUnit: "per order",
      choices: [
        "Buko Pandan",
        "Leche Flan",
        "Gelatin",
        "Mixed Fruits",
        "Coffee Jelly",
      ],
    },
  ],

  notes: [
    "Free delivery within Calapan City only with minimum order.",
    "Kiddie meals and party trays are also available.",
  ],
};

export const pixeeCoffeeMilkteaBar = {
  title: "Coffee & Milktea Bar",

  packages: [
    {
      id: "coffee-package-a",
      name: "Package A – Classic Sips",
      thumbnail: "/profiles/business/pixeeplates/packages/coffee-package-a.jpeg",
      price: 4999,
      duration: "2 hours service",
      cups: 70,
      inclusions: [
        "Choice of 2 flavors of non-coffee drinks (milk tea and fruit series)",
        "Choice of 2 flavors of coffee (hot or iced)",
        "Coffee served in 8oz (hot) and 12oz (cold)",
        "2 uniformed barista staff",
        noTransportationCalapan,
      ],
      optionalAddons: ["Extra hour – ₱1,500/hour", "Extra 30 cups – ₱1,500"],
    },
    {
      id: "coffee-package-b",
      name: "Package B – Premium",
      thumbnail: "/profiles/business/pixeeplates/packages/coffee-package-b.jpeg",
      subtitle: "Most Popular",
      price: 7999,
      duration: "3 hours service",
      cups: 100,
      inclusions: [
        "Choice of 3 flavors of non-coffee drinks (milk tea and fruit series)",
        "Choice of 3 flavors of coffee (hot or iced)",
        "Coffee served in 8oz (hot) and 12oz (cold)",
        "Personalized event signage (your logo/event name)",
        "Add-ons: pearls and nata de coco",
        "3 uniformed barista staff",
        noTransportationCalapan,
      ],
      optionalAddons: ["Extra hour – ₱1,500/hour", "Extra 30 cups – ₱1,500"],
      free: ["Selfie Mirror with layout"],
    },
    {
      id: "coffee-package-c",
      name: "Package C – Luxury",
      thumbnail: "/profiles/business/pixeeplates/packages/coffee-package-c.jpeg",
      price: 10999,
      duration: "3 hours service",
      cups: 150,
      inclusions: [
        "Choice of 4 flavors of non-coffee drinks (milk tea and fruit series)",
        "Choice of 4 flavors of coffee (hot or iced)",
        "Coffee served in 8oz (hot) and 12oz (cold)",
        "Personalized event signage (your logo/event name)",
        "Add-ons: pearls and nata de coco",
        "3 uniformed barista staff",
        noTransportationCalapan,
      ],
      optionalAddons: ["Extra hour – ₱1,500/hour", "Extra 30 cups – ₱1,500"],
      free: ["Selfie Mirror with layout"],
    },
  ],
};

const pixeeplates: BusinessProfile = {
  id: "pixeeplates",
  type: "business",
  template: "pixeeplates",
  businessName: "PIXEEPLATES",
  tagline: "Event Services",
  logo: "/profiles/business/pixeeplates/pixeeplates-logo.png",
  avatar: "/profiles/business/pixeeplates/logo.png",
  banner: "/profiles/business/pixeeplates/pixeeplates-banner.png",
  contactName: "PIXEEPLATES",
  contactTitle: "Event Services",
  email: "pixeeplates.01@gmail.com",
  phone: pixeePhoneNumbers[0],
  location: "Calapan City, Oriental Mindoro",
  socials: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/pixeeplates",
    },
    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@pixeeplates",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/pixeeplates/",
    },
  ],
};

export default pixeeplates;
