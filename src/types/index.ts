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
  createdDate?: string;
  lastUpdated?: string;
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
}

// Types cho Report
export interface Report {
  id: string;
  shopId: string;
  userId: string;
  userName: string;
  reason: 'scam' | 'fake-product' | 'poor-service' | 'not-delivery' | 'other';
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
