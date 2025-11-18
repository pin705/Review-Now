# 🚀 Quick Start Guide - Review Now Backend

## Khởi động nhanh trong 3 phút

### Prerequisites
```bash
# Cài đặt MongoDB (nếu chưa có)
# MacOS:
brew install mongodb-community

# Ubuntu:
sudo apt install mongodb

# Windows:
# Download từ https://www.mongodb.com/try/download/community
```

### Bước 1: Clone và Setup (30 giây)
```bash
git clone <repository-url>
cd Review-Now

# Install dependencies cho cả frontend và backend
npm install
cd review-now-backend && npm install && cd ..
```

### Bước 2: Khởi động MongoDB (10 giây)
```bash
# Khởi động MongoDB
# MacOS/Linux:
sudo systemctl start mongodb
# hoặc đơn giản:
mongod

# Kiểm tra MongoDB đang chạy:
mongosh --eval "db.version()"
```

### Bước 3: Setup Backend (1 phút)
```bash
cd review-now-backend

# Tạo file environment
cp .env.example .env

# Seed dữ liệu mẫu vào database
npm run seed

# Khởi động backend server
npm run dev
```

✅ Backend đang chạy tại: `http://localhost:3000`

### Bước 4: Setup Frontend (1 phút)
Mở terminal mới:
```bash
cd Review-Now

# Tạo file environment
cp .env.example .env

# Build CSS
npm run build:css

# Khởi động Zalo Mini App
npm start
```

✅ Frontend đang chạy!

---

## 🧪 Kiểm tra Backend

### Cách 1: Test Script
```bash
cd review-now-backend
./test-api.sh
```

### Cách 2: curl
```bash
# Lấy danh sách shops
curl http://localhost:3000/api/shops

# Tìm kiếm shop
curl "http://localhost:3000/api/shops/search?q=0901234567&type=phone"

# Lấy reviews
curl http://localhost:3000/api/reviews
```

### Cách 3: Browser
Mở browser và truy cập:
- http://localhost:3000/api/shops
- http://localhost:3000/api/reviews

---

## 📱 Sử dụng App

1. Mở Zalo Mini App (theo hướng dẫn của `npm start`)
2. Tìm kiếm shop bằng số điện thoại: `0901234567`
3. Xem thông tin shop và reviews
4. Thêm review mới
5. Báo cáo shop (nếu cần)

---

## 🔧 Troubleshooting

### Lỗi: "Cannot connect to MongoDB"
```bash
# Kiểm tra MongoDB đang chạy
ps aux | grep mongod

# Nếu chưa chạy, khởi động:
mongod
```

### Lỗi: "Port 3000 already in use"
```bash
# Tìm process đang dùng port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Lỗi: "Failed to fetch"
```bash
# Kiểm tra backend đang chạy
curl http://localhost:3000/api/shops

# Nếu không chạy, start lại:
cd review-now-backend
npm run dev
```

### Database trống
```bash
# Chạy lại seed
cd review-now-backend
npm run seed
```

---

## 📊 Dữ liệu mẫu

Sau khi seed, database sẽ có:
- **5 shops** với đa dạng trust scores
- **10 reviews** (positive và negative)
- Sẵn sàng để test tất cả tính năng

---

## 🎯 Next Steps

1. ✅ Test tất cả tính năng trong app
2. ✅ Thêm shops mới
3. ✅ Viết reviews
4. ✅ Tìm kiếm và filter
5. 📖 Đọc [DEPLOYMENT.md](DEPLOYMENT.md) để biết thêm chi tiết
6. 🔒 Đọc [SECURITY.md](SECURITY.md) trước khi deploy production

---

## 💡 Tips

- Dùng `npm run seed` để reset database về trạng thái ban đầu
- Dùng MongoDB Compass để xem database GUI: https://www.mongodb.com/products/compass
- Dùng Postman để test API: Import base URL `http://localhost:3000/api`
- Check logs nếu có lỗi: Backend logs xuất hiện trong terminal

---

## 📚 Documentation

- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Chi tiết deployment
- [Backend README](review-now-backend/README.md) - API docs
- [SECURITY.md](SECURITY.md) - Security guide
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Tổng kết project

---

**Happy Coding! 🎉**

Nếu cần hỗ trợ, check các file documentation hoặc mở issue trên GitHub.
