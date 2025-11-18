# Review Now Backend

Backend API cho Review Now Mini App sử dụng Nitro + MongoDB.

## 🛠️ Công nghệ

- **Framework**: Nitro (Universal server framework)
- **Database**: MongoDB + Mongoose
- **Runtime**: Node.js

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Cài đặt MongoDB (nếu chưa có)
# MacOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download từ https://www.mongodb.com/try/download/community
```

## 🚀 Chạy server

### Development mode

```bash
# Khởi động MongoDB (nếu chưa chạy)
mongod

# Khởi động dev server
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

### Production build

```bash
# Build
npm run build

# Preview production build
npm run preview
```

## 🗄️ Database Setup

### Seed dữ liệu mẫu

```bash
# Chạy script để tạo dữ liệu mẫu
node seed.js
```

Script này sẽ:
- Xóa dữ liệu cũ (nếu có)
- Tạo 5 shops mẫu
- Tạo 10 reviews mẫu

### Biến môi trường

Tạo file `.env` trong thư mục backend:

```env
MONGODB_URI=mongodb://localhost:27017/review-now
```

## 📡 API Endpoints

### Shops

- `GET /api/shops` - Lấy tất cả shops
- `GET /api/shops/:id` - Lấy shop theo ID
- `GET /api/shops/search?q=query&type=phone|name|link` - Tìm kiếm shop
- `POST /api/shops` - Tạo shop mới

**POST Body:**
```json
{
  "name": "Shop Name",
  "phone": "0901234567",
  "link": "https://example.com",
  "platform": "facebook|shopee|lazada|tiktok|zalo|other",
  "verified": false
}
```

### Reviews

- `GET /api/reviews` - Lấy tất cả reviews (sắp xếp theo mới nhất)
- `GET /api/shops/:shopId/reviews` - Lấy reviews của shop
- `GET /api/shops/:shopId/reviews?type=positive|negative` - Lấy reviews theo loại
- `POST /api/reviews` - Tạo review mới

**POST Body:**
```json
{
  "shopId": "shop_id",
  "userId": "user_id",
  "userName": "User Name",
  "rating": 5,
  "content": "Review content",
  "type": "positive|negative"
}
```

### Reports

- `POST /api/reports` - Tạo report mới

**POST Body:**
```json
{
  "shopId": "shop_id",
  "userId": "user_id",
  "userName": "User Name",
  "reason": "scam|fake-product|poor-service|not-delivery|other",
  "content": "Report content",
  "evidence": ["url1", "url2"]
}
```

## 🔧 Models

### Shop Model
```typescript
{
  name: string,
  phone: string,
  url: string,
  platform: 'facebook' | 'shopee' | 'lazada' | 'tiktok' | 'zalo' | 'other',
  trustScore: number (0-100),
  totalReviews: number,
  positiveReviews: number,
  negativeReviews: number,
  verified: boolean,
  createdDate: Date,
  lastUpdated: Date
}
```

### Review Model
```typescript
{
  shopId: ObjectId,
  userId: string,
  userName: string,
  rating: number (1-5),
  content: string,
  type: 'positive' | 'negative',
  helpful: number,
  createdAt: Date
}
```

### Report Model
```typescript
{
  shopId: ObjectId,
  userId: string,
  userName: string,
  reason: 'scam' | 'fake-product' | 'poor-service' | 'not-delivery' | 'other',
  content: string,
  evidence: string[],
  status: 'pending' | 'verified' | 'rejected',
  createdAt: Date
}
```

## 🔒 CORS

Backend được cấu hình CORS cho phép frontend kết nối từ mọi origin. Trong production nên giới hạn origin cụ thể.

## 📝 Notes

- Trust score được tự động tính toán dựa trên tỷ lệ positive/negative reviews
- Khi tạo review mới, statistics của shop sẽ được cập nhật tự động
- Database indexes được tối ưu cho search và query hiệu quả

