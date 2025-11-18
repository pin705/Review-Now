import { Shop, Review, Report, SearchResult, SearchType } from '../types';
import { mockShops, mockReviews } from '../data/mockData';

// Service sẽ được thay thế bằng API thực tế sau
export const shopService = {
  // Tìm kiếm shop
  searchShops: async (
    query: string,
    type: SearchType
  ): Promise<SearchResult> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filtered = mockShops.filter(shop => {
      if (type === 'phone') {
        return shop.phone?.includes(query);
      } else if (type === 'name') {
        return shop.name.toLowerCase().includes(query.toLowerCase());
      } else if (type === 'link') {
        return shop.url?.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });

    return {
      shops: filtered,
      hasMore: false,
      total: filtered.length
    };
  },

  // Lấy thông tin chi tiết shop
  getShopById: async (id: string): Promise<Shop | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockShops.find(shop => shop.id === id) || null;
  },

  // Lấy reviews của shop
  getShopReviews: async (
    shopId: string,
    type?: 'positive' | 'negative'
  ): Promise<Review[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let reviews = mockReviews.filter(r => r.shopId === shopId);
    if (type) {
      reviews = reviews.filter(r => r.type === type);
    }
    return reviews;
  },

  // Thêm review mới
  addReview: async (review: Omit<Review, 'id' | 'createdAt' | 'helpful'>): Promise<Review> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      createdAt: new Date().toISOString(),
      helpful: 0
    };
    mockReviews.push(newReview);
    return newReview;
  },

  // Thêm report
  addReport: async (report: Omit<Report, 'id' | 'createdAt' | 'status'>): Promise<Report> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newReport: Report = {
      ...report,
      id: `rp${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    return newReport;
  }
};
