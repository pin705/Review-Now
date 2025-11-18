import mongoose from 'mongoose';
import { Shop } from './models/Shop.js';
import { Review } from './models/Review.js';

const mockShopsData = [
  {
    name: 'Shop Thời Trang ABC',
    phone: '0901234567',
    url: 'https://facebook.com/shopabc',
    platform: 'facebook',
    trustScore: 85,
    totalReviews: 120,
    positiveReviews: 102,
    negativeReviews: 18,
    verified: true,
    createdDate: new Date('2023-01-15'),
    lastUpdated: new Date('2024-11-15')
  },
  {
    name: 'Mỹ Phẩm XYZ Official',
    phone: '0912345678',
    url: 'https://shopee.vn/shopxyz',
    platform: 'shopee',
    trustScore: 65,
    totalReviews: 45,
    positiveReviews: 30,
    negativeReviews: 15,
    verified: false,
    createdDate: new Date('2024-03-20'),
    lastUpdated: new Date('2024-11-10')
  },
  {
    name: 'Đồ Công Nghệ TechStore',
    phone: '0923456789',
    url: 'https://lazada.vn/techstore',
    platform: 'lazada',
    trustScore: 92,
    totalReviews: 250,
    positiveReviews: 235,
    negativeReviews: 15,
    verified: true,
    createdDate: new Date('2022-06-10'),
    lastUpdated: new Date('2024-11-17')
  },
  {
    name: 'Shop Quần Áo Rẻ',
    phone: '0934567890',
    platform: 'tiktok',
    trustScore: 35,
    totalReviews: 80,
    positiveReviews: 28,
    negativeReviews: 52,
    verified: false,
    createdDate: new Date('2024-08-01'),
    lastUpdated: new Date('2024-11-16')
  },
  {
    name: 'Thực Phẩm Sạch Green Life',
    phone: '0945678901',
    url: 'https://zalo.me/greenlife',
    platform: 'zalo',
    trustScore: 78,
    totalReviews: 150,
    positiveReviews: 120,
    negativeReviews: 30,
    verified: true,
    createdDate: new Date('2023-05-20'),
    lastUpdated: new Date('2024-11-18')
  }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/review-now';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Shop.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Insert shops
    const shops = await Shop.insertMany(mockShopsData);
    console.log(`Inserted ${shops.length} shops`);

    // Create reviews for shops
    const reviewsData = [
      // Shop 1 reviews
      {
        shopId: shops[0]._id,
        userId: 'u1',
        userName: 'Nguyễn Văn A',
        rating: 5,
        content: 'Shop uy tín, hàng đẹp đúng mô tả. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ tiếp!',
        type: 'positive',
        createdAt: new Date('2024-11-10T10:00:00Z'),
        helpful: 15
      },
      {
        shopId: shops[0]._id,
        userId: 'u2',
        userName: 'Trần Thị B',
        rating: 1,
        content: 'Hàng kém chất lượng, shop không hoàn tiền khi tôi yêu cầu đổi trả.',
        type: 'negative',
        createdAt: new Date('2024-11-08T14:30:00Z'),
        helpful: 8
      },
      {
        shopId: shops[0]._id,
        userId: 'u3',
        userName: 'Lê Văn C',
        rating: 4,
        content: 'Sản phẩm tốt, giá hợp lý. Trừ 1 sao vì ship hơi lâu.',
        type: 'positive',
        createdAt: new Date('2024-11-05T09:15:00Z'),
        helpful: 5
      },
      // Shop 2 reviews
      {
        shopId: shops[1]._id,
        userId: 'u4',
        userName: 'Phạm Thị D',
        rating: 3,
        content: 'Sản phẩm tạm được, không quá tốt nhưng cũng không tệ.',
        type: 'positive',
        createdAt: new Date('2024-11-07T16:20:00Z'),
        helpful: 3
      },
      {
        shopId: shops[1]._id,
        userId: 'u5',
        userName: 'Hoàng Văn E',
        rating: 2,
        content: 'Mỹ phẩm không rõ nguồn gốc, dùng bị dị ứng. Không nên mua!',
        type: 'negative',
        createdAt: new Date('2024-11-03T11:45:00Z'),
        helpful: 12
      },
      // Shop 3 reviews
      {
        shopId: shops[2]._id,
        userId: 'u6',
        userName: 'Đặng Thị F',
        rating: 5,
        content: 'Shop siêu uy tín! Điện thoại chính hãng 100%, bảo hành tốt.',
        type: 'positive',
        createdAt: new Date('2024-11-12T13:00:00Z'),
        helpful: 25
      },
      {
        shopId: shops[2]._id,
        userId: 'u7',
        userName: 'Bùi Văn G',
        rating: 5,
        content: 'Mua laptop về dùng rất tốt, tư vấn nhiệt tình. Recommend!',
        type: 'positive',
        createdAt: new Date('2024-11-11T08:30:00Z'),
        helpful: 18
      },
      // Shop 4 reviews
      {
        shopId: shops[3]._id,
        userId: 'u8',
        userName: 'Võ Thị H',
        rating: 1,
        content: 'Shop lừa đảo! Order không ship, block luôn. Mọi người cẩn thận!',
        type: 'negative',
        createdAt: new Date('2024-11-09T15:20:00Z'),
        helpful: 45
      },
      {
        shopId: shops[3]._id,
        userId: 'u9',
        userName: 'Ngô Văn I',
        rating: 2,
        content: 'Quần áo nhìn ảnh đẹp nhưng nhận được hàng kém lắm.',
        type: 'negative',
        createdAt: new Date('2024-11-06T10:10:00Z'),
        helpful: 20
      },
      // Shop 5 reviews
      {
        shopId: shops[4]._id,
        userId: 'u10',
        userName: 'Trương Thị K',
        rating: 4,
        content: 'Rau củ tươi, giá hợp lý. Giao hàng đúng giờ.',
        type: 'positive',
        createdAt: new Date('2024-11-15T07:00:00Z'),
        helpful: 10
      }
    ];

    const reviews = await Review.insertMany(reviewsData);
    console.log(`Inserted ${reviews.length} reviews`);

    console.log('Database seeded successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
