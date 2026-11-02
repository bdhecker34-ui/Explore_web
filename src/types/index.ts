export type MainCategory = 'fashion-tech' | 'digital-subscriptions' | 'smm-panel' | 'mobile-recharge';

export type UserMode = 'customer' | 'reseller';

export type Language = 'bn' | 'en';

export interface B2BUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  shopName: string;
  phone: string;
  tier: 'Silver Dealer' | 'Gold Merchant' | 'Platinum Distributor';
  joinedDate: string;
  apiKey: string;
}

export interface SubCategory {
  id: string;
  nameBn: string;
  nameEn: string;
  mainCategoryId: MainCategory;
  iconName?: string;
}

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  mainCategory: MainCategory;
  subCategory: string;
  retailPrice: number; // খুচরা মূল্য (Customer Price in BDT)
  wholesalePrice: number; // পাইকারি/রিসেলার মূল্য (Reseller Price in BDT)
  suggestedResellPrice?: number; // প্রস্তাবিত বিক্রয় মূল্য
  image: string;
  descriptionBn: string;
  descriptionEn: string;
  features: string[];
  stockStatus: 'in_stock' | 'instant_delivery' | 'limited';
  rating: number;
  deliveryType: 'instant' | 'courier' | 'auto_recharge' | 'api';
  warrantyText?: string;
  specs?: Record<string, string>;
}

export interface SmmService {
  id: string;
  serviceCode: number;
  subCategory: 'facebook' | 'youtube' | 'instagram-tiktok' | 'telegram-x';
  nameBn: string;
  nameEn: string;
  retailRatePer1k: number; // BDT per 1,000
  wholesaleRatePer1k: number; // BDT per 1,000 for resellers
  minQuantity: number;
  maxQuantity: number;
  speed: string;
  guarantee: string;
  description: string;
}

export interface DrivePack {
  id: string;
  operator: 'gp' | 'bl' | 'robi' | 'airtel' | 'teletalk';
  type: 'internet' | 'minute' | 'combo';
  titleBn: string;
  titleEn: string;
  validity: string;
  regularPrice: number;
  offerPrice: number; // Customer price
  wholesalePrice: number; // Reseller price
  commission: number; // Reseller profit
  tag?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  customDetails?: {
    recipientEmail?: string;
    customNote?: string;
    resellerBrandName?: string;
  };
}

export interface Order {
  id: string;
  createdAt: string;
  type: 'physical' | 'digital' | 'smm' | 'recharge';
  itemsSummary: string;
  totalAmount: number;
  profitEarned?: number; // if placed in reseller mode
  isResellerOrder: boolean;
  status: 'pending' | 'processing' | 'completed';
  paymentMethod: 'wallet' | 'bkash' | 'nagad' | 'cod';
  customerInfo: {
    name: string;
    phone: string;
    address?: string;
    accountEmail?: string;
  };
  deliveryDetails?: {
    trackingCode?: string;
    digitalVoucher?: string;
    smmTargetLink?: string;
    rechargeMobile?: string;
  };
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'deposit' | 'purchase' | 'commission_bonus' | 'refund';
  amount: number;
  description: string;
  status: 'successful' | 'pending';
}
