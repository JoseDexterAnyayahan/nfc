
export type PixeePackage = {
  id: string;
  name: string;
  subtitle?: string;
  price?: number;
  priceLabel?: string;
  thumbnail: string;
  description?: string;
  inclusions: string[];
  optionalAddons: string[];
  free?: string[];
  specialOffer?: string[];
  notes?: string;
};

export type PixeePerfumeRate = {
  guests: number;
  price: number;
};

export type PixeePerfumeTier = {
  size: string;
  rates: PixeePerfumeRate[];
};

export type PixeeGuestRate = {
  guests: number;
  price: number | null;
};

export type PixeeServicePackage = {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  price?: number | null;
  priceLabel?: string;
  rates?: PixeeGuestRate[];
  inclusions?: string[];
  optionalAddons?: string[];
  free?: string[];
  specialOffer?: string[];
  notes?: string[];
};

export type PixeeGrazingPackage = {
  id: string;
  name: string;
  rates: PixeeGuestRate[];
  inclusions: string[];
};

export type PixeeDrinkPackage = {
  id: string;
  name: string;
  description?: string;
  rates: PixeeGuestRate[];
};

export type PixeeCoffeePackage = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  duration: string;
  cups: number;
  inclusions: string[];
  optionalAddons: string[];
  free?: string[];
};
