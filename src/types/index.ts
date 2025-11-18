// Types cho Shop
export interface Shop {
  id: string;
  name: string;
  phone?: string;
  url?: string;
  platform: 'facebook' | 'shopee' | 'lazada' | 'tiktok' | 'zalo' | 'other';
  trustScore: number; // 0-100
  totalReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  verified: boolean;
  createdBy?: string; // Zalo User ID
  needsModeration?: boolean; // True if first review needs verification
  createdDate?: string;
  lastUpdated?: string;
  images?: string[]; // Array of shop image URLs
}

// Types cho Review/Rating
export interface Review {
  id: string;
  shopId: string;
  userId: string;
  userName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  type: 'positive' | 'negative';
  createdAt: string;
  helpful: number;
  isFirstReview?: boolean; // True if this is creator's first review
  needsModeration?: boolean; // True if content should be hidden
  images?: string[]; // Array of image URLs
}

// Types cho Report
export interface Report {
  id: string;
  shopId: string;
  userId: string;
  userName: string;
  reason: 'scam' | 'fake-product' | 'poor-service' | 'not-delivery' | 'duplicate-shop' | 'wrong-info' | 'other';
  content: string;
  evidence?: string[]; // URLs to images
  createdAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

// Search types
export type SearchType = 'phone' | 'name' | 'link';

export interface SearchResult {
  shops: Shop[];
  hasMore: boolean;
  total: number;
}

// Generic pagination payload
export interface Paginated<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  page: number;
}
