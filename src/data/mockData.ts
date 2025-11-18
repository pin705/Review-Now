// Mock database cho Review Now app
import { Shop, Review } from '../types';

export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Shop Thời Trang ABC',
    phone: '0901234567',
    url: 'https://facebook.com/shopabc',
    platform: 'facebook',
    trustScore: 85,
    totalReviews: 120,
    positiveReviews: 102,
    negativeReviews: 18,
    verified: true,
    createdDate: '2023-01-15',
    lastUpdated: '2024-11-15'
  },
  {
    id: '2',
    name: 'Mỹ Phẩm XYZ Official',
    phone: '0912345678',
    url: 'https://shopee.vn/shopxyz',
    platform: 'shopee',
    trustScore: 65,
    totalReviews: 45,
    positiveReviews: 30,
    negativeReviews: 15,
    verified: false,
    createdDate: '2024-03-20',
    lastUpdated: '2024-11-10'
  },
  {
    id: '3',
    name: 'Đồ Công Nghệ TechStore',
    phone: '0923456789',
    url: 'https://lazada.vn/techstore',
    platform: 'lazada',
    trustScore: 92,
    totalReviews: 250,
    positiveReviews: 235,
    negativeReviews: 15,
    verified: true,
    createdDate: '2022-06-10',
    lastUpdated: '2024-11-17'
  },
  {
    id: '4',
    name: 'Shop Quần Áo Rẻ',
    phone: '0934567890',
    platform: 'tiktok',
    trustScore: 35,
    totalReviews: 80,
    positiveReviews: 28,
    negativeReviews: 52,
    verified: false,
    createdDate: '2024-08-01',
    lastUpdated: '2024-11-16'
  },
  {
    id: '5',
    name: 'Thực Phẩm Sạch Green Life',
    phone: '0945678901',
    url: 'https://zalo.me/greenlife',
    platform: 'zalo',
    trustScore: 78,
    totalReviews: 150,
    positiveReviews: 120,
    negativeReviews: 30,
    verified: true,
    createdDate: '2023-05-20',
    lastUpdated: '2024-11-18'
  }
];

export const mockReviews: Review[] = [
  // Shop 1 reviews
  {
    id: 'r1',
    shopId: '1',
    userId: 'u1',
    userName: 'Nguyễn Văn A',
    rating: 5,
    content: 'Shop uy tín, hàng đẹp đúng mô tả. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ tiếp!',
    type: 'positive',
    createdAt: '2024-11-10T10:00:00Z',
    helpful: 15
  },
  {
    id: 'r2',
    shopId: '1',
    userId: 'u2',
    userName: 'Trần Thị B',
    rating: 1,
    content: 'Hàng kém chất lượng, shop không hoàn tiền khi tôi yêu cầu đổi trả.',
    type: 'negative',
    createdAt: '2024-11-08T14:30:00Z',
    helpful: 8
  },
  {
    id: 'r3',
    shopId: '1',
    userId: 'u3',
    userName: 'Lê Văn C',
    rating: 4,
    content: 'Sản phẩm tốt, giá hợp lý. Trừ 1 sao vì ship hơi lâu.',
    type: 'positive',
    createdAt: '2024-11-05T09:15:00Z',
    helpful: 5
  },
  // Shop 2 reviews
  {
    id: 'r4',
    shopId: '2',
    userId: 'u4',
    userName: 'Phạm Thị D',
    rating: 3,
    content: 'Sản phẩm tạm được, không quá tốt nhưng cũng không tệ.',
    type: 'positive',
    createdAt: '2024-11-07T16:20:00Z',
    helpful: 3
  },
  {
    id: 'r5',
    shopId: '2',
    userId: 'u5',
    userName: 'Hoàng Văn E',
    rating: 2,
    content: 'Mỹ phẩm không rõ nguồn gốc, dùng bị dị ứng. Không nên mua!',
    type: 'negative',
    createdAt: '2024-11-03T11:45:00Z',
    helpful: 12
  },
  // Shop 3 reviews
  {
    id: 'r6',
    shopId: '3',
    userId: 'u6',
    userName: 'Đặng Thị F',
    rating: 5,
    content: 'Shop siêu uy tín! Điện thoại chính hãng 100%, bảo hành tốt.',
    type: 'positive',
    createdAt: '2024-11-12T13:00:00Z',
    helpful: 25
  },
  {
    id: 'r7',
    shopId: '3',
    userId: 'u7',
    userName: 'Bùi Văn G',
    rating: 5,
    content: 'Mua laptop về dùng rất tốt, tư vấn nhiệt tình. Recommend!',
    type: 'positive',
    createdAt: '2024-11-11T08:30:00Z',
    helpful: 18
  },
  // Shop 4 reviews
  {
    id: 'r8',
    shopId: '4',
    userId: 'u8',
    userName: 'Võ Thị H',
    rating: 1,
    content: 'Shop lừa đảo! Order không ship, block luôn. Mọi người cẩn thận!',
    type: 'negative',
    createdAt: '2024-11-09T15:20:00Z',
    helpful: 45
  },
  {
    id: 'r9',
    shopId: '4',
    userId: 'u9',
    userName: 'Ngô Văn I',
    rating: 2,
    content: 'Quần áo nhìn ảnh đẹp nhưng nhận được hàng kém lắm.',
    type: 'negative',
    createdAt: '2024-11-06T10:10:00Z',
    helpful: 20
  },
  // Shop 5 reviews
  {
    id: 'r10',
    shopId: '5',
    userId: 'u10',
    userName: 'Trương Thị K',
    rating: 4,
    content: 'Rau củ tươi, giá hợp lý. Giao hàng đúng giờ.',
    type: 'positive',
    createdAt: '2024-11-15T07:00:00Z',
    helpful: 10
  }
];
