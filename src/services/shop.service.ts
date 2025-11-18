import { Shop, Review, Report, SearchResult, SearchType, Paginated } from '../types';

// Backend API URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';

// Service integrated with Nitro + MongoDB backend
export const shopService = {
  // Tìm kiếm shop
  searchShops: async (
    query: string,
    type: SearchType,
    page: number = 1,
    limit: number = 10
  ): Promise<SearchResult> => {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/search?q=${encodeURIComponent(query)}&type=${type}&page=${page}&limit=${limit}`);
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
    options?: { type?: 'positive' | 'negative'; page?: number; limit?: number }
  ): Promise<Paginated<Review>> => {
    try {
      const params = new URLSearchParams();
      if (options?.type) params.set('type', options.type);
      params.set('page', String(options?.page ?? 1));
      params.set('limit', String(options?.limit ?? 10));
      const response = await fetch(`${API_BASE_URL}/shops/${shopId}/reviews?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return { items: [], total: 0, hasMore: false, page: 1 };
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
  getRecentReviews: async (page: number = 1, limit: number = 10): Promise<Paginated<Review>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recent reviews:', error);
      return { items: [], total: 0, hasMore: false, page: 1 };
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
    userId: string; // Zalo User ID
    images?: string[];
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
        const error = await response.json();
        throw new Error(error.statusMessage || 'Failed to create shop');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating shop:', error);
      throw error;
    }
  },

  // Report shop
  reportShop: async (reportData: {
    shopId: string;
    userId: string;
    userName: string;
    reason: 'scam' | 'fake-product' | 'poor-service' | 'not-delivery' | 'duplicate-shop' | 'wrong-info' | 'other';
    content: string;
    evidence?: string[];
  }): Promise<Report> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/shop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to report shop');
      }
      return await response.json();
    } catch (error) {
      console.error('Error reporting shop:', error);
      throw error;
    }
  },

  // Upload image to Cloudinary
  uploadImage: async (base64Image: string, folder?: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image, folder }),
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }
      return result.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Admin functions
  getAllReports: async (): Promise<Report[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reports`);
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reports:', error);
      return [];
    }
  },

  getAllReviews: async (): Promise<Review[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch all reviews');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      return [];
    }
  },

  updateReportStatus: async (reportId: string, status: 'verified' | 'rejected'): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reports/${reportId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update report status');
      }
    } catch (error) {
      console.error('Error updating report status:', error);
      throw error;
    }
  },

  deleteShop: async (shopId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/shops/${shopId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete shop');
      }
    } catch (error) {
      console.error('Error deleting shop:', error);
      throw error;
    }
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },

  approveReview: async (reviewId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}/approve`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to approve review');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      throw error;
    }
  }
};
