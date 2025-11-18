# Hướng dẫn Triển khai Review Now

## 📋 Yêu cầu hệ thống

- Node.js >= 16
- MongoDB >= 4.4
- npm hoặc yarn

## 🚀 Cài đặt từ đầu

### 1. Clone repository

```bash
git clone <repository-url>
cd Review-Now
```

### 2. Cài đặt và khởi động Backend

```bash
# Di chuyển vào thư mục backend
cd review-now-backend

# Cài đặt dependencies
npm install

# Tạo file môi trường
cp .env.example .env
# Chỉnh sửa .env nếu cần (mặc định: mongodb://localhost:27017/review-now)

# Khởi động MongoDB (nếu chưa chạy)
# MacOS/Linux:
sudo systemctl start mongodb
# hoặc
mongod

# Seed dữ liệu mẫu vào database
npm run seed

# Khởi động backend server
npm run dev
```

Backend sẽ chạy tại `http://localhost:3000`

### 3. Cài đặt và khởi động Frontend

Mở terminal mới:

```bash
# Quay về thư mục root
cd Review-Now

# Cài đặt dependencies
npm install

# Tạo file môi trường
cp .env.example .env
# Mặc định VITE_API_URL=http://localhost:3000/api

# Build CSS
npm run build:css

# Khởi động Zalo Review Now development server
npm start
```

Frontend sẽ chạy tại cổng được cấu hình bởi Zalo Review Now (thường là `http://localhost:3000` hoặc khác).

## 🔧 Cấu hình

### Backend (.env trong review-now-backend/)

```env
MONGODB_URI=mongodb://localhost:27017/review-now
# PORT=3000  # Tùy chọn, mặc định 3000
```

### Frontend (.env trong root/)

```env
VITE_API_URL=http://localhost:3000/api
```

## 📊 Quản lý Database

### Xem dữ liệu trong MongoDB

```bash
# Kết nối MongoDB shell
mongosh

# Chọn database
use review-now

# Xem các collections
show collections

# Xem shops
db.shops.find().pretty()

# Xem reviews
db.reviews.find().pretty()

# Xem reports
db.reports.find().pretty()
```

### Reset database

```bash
cd review-now-backend
npm run seed
```

Lệnh này sẽ:
1. Xóa toàn bộ dữ liệu cũ
2. Tạo lại 5 shops mẫu
3. Tạo lại 10 reviews mẫu

### Backup database

```bash
# Backup
mongodump --db review-now --out backup/

# Restore
mongorestore --db review-now backup/review-now/
```

## 🧪 Kiểm tra API

### Sử dụng curl

```bash
# Get all shops
curl http://localhost:3000/api/shops

# Get shop by ID (thay YOUR_SHOP_ID)
curl http://localhost:3000/api/shops/YOUR_SHOP_ID

# Search shops
curl "http://localhost:3000/api/shops/search?q=0901234567&type=phone"

# Create new shop
curl -X POST http://localhost:3000/api/shops \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Shop",
    "phone": "0900000000",
    "platform": "facebook",
    "verified": false
  }'

# Get all reviews
curl http://localhost:3000/api/reviews

# Add review (thay YOUR_SHOP_ID)
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "shopId": "YOUR_SHOP_ID",
    "userId": "test_user",
    "userName": "Test User",
    "rating": 5,
    "content": "Great shop!",
    "type": "positive"
  }'
```

## 🐛 Xử lý sự cố

### Backend không kết nối được MongoDB

**Lỗi:** `MongoDB connection error`

**Giải pháp:**
1. Kiểm tra MongoDB đang chạy: `systemctl status mongodb` hoặc `ps aux | grep mongod`
2. Kiểm tra MONGODB_URI trong .env
3. Thử kết nối thủ công: `mongosh mongodb://localhost:27017`

### Frontend không gọi được API

**Lỗi:** `Failed to fetch` hoặc CORS error

**Giải pháp:**
1. Kiểm tra backend đang chạy: `curl http://localhost:3000/api/shops`
2. Kiểm tra VITE_API_URL trong .env
3. Đảm bảo không có tường lửa chặn cổng 3000
4. Restart frontend server sau khi thay đổi .env

### Dữ liệu không hiển thị

**Giải pháp:**
1. Kiểm tra database có dữ liệu: `mongosh` → `use review-now` → `db.shops.count()`
2. Chạy lại seed: `npm run seed` trong thư mục backend
3. Kiểm tra console browser để xem lỗi API

## 🏭 Production Deployment

### Backend

```bash
cd review-now-backend

# Build production
npm run build

# Chạy production server
npm run preview

# Hoặc chạy trực tiếp
node .output/server/index.mjs
```

**Environment Variables cho Production:**
- `MONGODB_URI`: Connection string tới MongoDB production
- `NODE_ENV`: Đặt thành "production"
- `PORT`: Cổng server (mặc định 3000)

### Frontend

```bash
# Build frontend
npm run build:css
npm run deploy
```

## 📝 Notes

1. **CORS**: Backend đã được cấu hình để chấp nhận request từ mọi origin (`*`). Trong production, nên giới hạn origin cụ thể.

2. **Authentication**: Hiện tại chưa có authentication. Nên thêm JWT hoặc Zalo authentication cho production.

3. **Rate Limiting**: Nên thêm rate limiting cho API endpoints trong production.

4. **Database Indexes**: Các indexes đã được tạo sẵn trong models để tối ưu performance.

5. **Error Handling**: Frontend đã có error handling cơ bản, có thể mở rộng với toast notifications.

## 🔐 Security Checklist

- [ ] Thêm authentication/authorization
- [ ] Giới hạn CORS origins
- [ ] Thêm rate limiting
- [ ] Validate input data
- [ ] Sanitize user content
- [ ] Use HTTPS in production
- [ ] Secure MongoDB (authentication, network restrictions)
- [ ] Không commit .env files
- [ ] Use environment-specific configs

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Logs của backend server
2. Console của browser
3. MongoDB logs
4. Network tab trong DevTools
