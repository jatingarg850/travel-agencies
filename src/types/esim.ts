export interface Esim {
  id: number;
  name: string;
  image: string;
  destinationCountries: string[];
  dataAmount: string;
  validity: string;
  price: number;
  originalPrice?: number;
  coverage: string;
  speed: string;
  features: string[];
  rating: number;
  totalReviews: number;
  activationInstructions: string;
  supportLanguages: string[];
  roamingPartners: number;
}

export interface EsimSearchParams {
  destinationCountry: string;
  dataAmount: string;
  validity: string;
  purchaseDate: string;
}

export interface EsimPurchase {
  id: string;
  esimId: number;
  searchParams: EsimSearchParams;
  buyerInfo: BuyerInfo;
  totalPrice: number;
  purchaseDate: string;
  activationCode?: string;
  status: 'pending' | 'activated' | 'expired' | 'cancelled';
}

export interface BuyerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deviceType: string;
  deviceModel: string;
}

export interface EsimPlan {
  id: string;
  name: string;
  dataAmount: string;
  validity: string;
  price: number;
  coverage: string[];
  speed: string;
  rollover: boolean;
}
