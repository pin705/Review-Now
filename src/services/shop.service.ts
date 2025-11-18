import { Shop, Review, Report, SearchResult, SearchType } from '../types';

// Backend API URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Service integrated with Nitro + MongoDB backend
export const shopService = {
  // Tìm kiếm shop
  searchShops: async (
    query: string,
    type: SearchType
  ): Promise<SearchResult> => {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/search?q=${encodeURIComponent(query)}&type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to search shops');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching shops:', error);
      return {
        shops: [],
        hasMore: false,
        total: 0
      };
    }
  },

  // Lấy thông tin chi tiết shop
  getShopById: async (id: string): Promise<Shop | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/${id}`);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching shop:', error);
      return null;
    }
  },

  // Lấy reviews của shop
  getShopReviews: async (
    shopId: string,
    type?: 'positive' | 'negative'
  ): Promise<Review[]> => {
    try {
      const url = type 
        ? `${API_BASE_URL}/shops/${shopId}/reviews?type=${type}`
        : `${API_BASE_URL}/shops/${shopId}/reviews`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  // Thêm review mới
  addReview: async (review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },

  // Thêm report
  addReport: async (report: Omit<Report, 'id' | 'createdAt' | 'status'>): Promise<Report> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      if (!response.ok) {
        throw new Error('Failed to add report');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding report:', error);
      throw error;
    }
  },

  // Lấy tất cả reviews gần đây
  getAllRecentReviews: async (): Promise<Review[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recent reviews:', error);
      return [];
    }
  },

  // Lấy tất cả shops
  getAllShops: async (): Promise<Shop[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/shops`);
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching shops:', error);
      return [];
    }
  },

  // Tạo shop mới
  createShop: async (shopData: {
    name: string;
    phone: string;
    link?: string;
    platform: string;
    verified: boolean;
  }): Promise<Shop> => {
    try {
      const response = await fetch(`${API_BASE_URL}/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shopData),
      });
      if (!response.ok) {
        throw new Error('Failed to create shop');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating shop:', error);
      throw error;
    }
  }
};
