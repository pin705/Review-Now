# Review Now - Mini App Kiểm Tra Độ Uy Tín Shop Online

![Review Now](https://img.shields.io/badge/Zalo-Mini_App-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

## 📱 Giới thiệu

**Review Now** là Mini App trên nền tảng Zalo giúp người dùng kiểm tra độ uy tín của các shop online trước khi mua hàng. Ứng dụng cung cấp:

- ✅ Điểm uy tín từ 0-100
- 📊 Thống kê đánh giá tích cực/tiêu cực
- 🔍 Tìm kiếm shop qua SĐT, tên shop, hoặc link
- ⭐ Đánh giá và chia sẻ trải nghiệm
- 🚨 Báo cáo shop lừa đảo

## 🎨 Tính năng

### 1. Màn hình Tra cứu (Search Screen)
- Tìm kiếm đa dạng: Số điện thoại / Tên shop / Link
- Segmented control để chuyển đổi phương thức tìm kiếm
- Hiển thị kết quả với điểm uy tín trực quan
- Autocomplete suggestions (sẽ phát triển)

### 2. Màn hình Hồ sơ Shop (Shop Profile)
- Điểm uy tín nổi bật với màu sắc phân loại:
  - 🟢 Xanh lá: Uy tín (70-100)
  - 🟡 Vàng: Trung bình (40-69)
  - 🔴 Đỏ: Không uy tín (0-39)
- Progress bar trực quan
- Thông tin shop: SĐT, platform, ngày tạo
- Huy hiệu "Đã xác thực"
- Tabs phân loại: Tất cả / Tích cực / Tiêu cực

### 3. Màn hình Đóng góp (Review/Report)
- Rating 5 sao với emoji phản hồi
- Textarea mô tả trải nghiệm
- Chuyển đổi giữa Đánh giá & Báo cáo
- Hướng dẫn viết review chất lượng

## 🛠️ Công nghệ

- **Framework**: React 18 + TypeScript
- **UI Library**: Zalo Mini Program UI (ZMP UI)
- **State Management**: Recoil
- **Routing**: React Router DOM
- **Styling**: TailwindCSS + Custom CSS
- **Build Tool**: Vite

## 📦 Cài đặt

```bash
# Clone repository
git clone <repo-url>

# Di chuyển vào thư mục dự án
cd Review-Now

# Cài đặt dependencies
npm install

# Build CSS
npm run build:css

# Chạy development server
npm start
```

## 🚀 Scripts

```bash
npm start          # Chạy Zalo Mini App development server
npm run build:css  # Build Tailwind CSS
npm run deploy     # Deploy lên Zalo Mini App platform
```

## 📂 Cấu trúc dự án

```
Review-Now/
├── src/
│   ├── components/          # Reusable components
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── TrustScoreCard.tsx
│   │   └── ReviewCard.tsx
│   ├── pages/              # Các màn hình chính
│   │   ├── SearchPage.tsx
│   │   ├── ShopProfilePage.tsx
│   │   └── ReviewPage.tsx
│   ├── services/           # API services
│   │   └── shop.service.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── utils/              # Helper functions
│   │   └── helpers.ts
│   ├── state/              # Recoil state
│   │   └── index.ts
│   └── css/                # Styles
│       ├── tailwind.css
│       └── app.scss
├── app-config.json         # Zalo Mini App config
├── package.json
└── README.md
```

## 🎨 Design System

### Màu sắc chính
- **Primary**: `#3b82f6` (Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Yellow)
- **Danger**: `#ef4444` (Red)

### Nguyên tắc thiết kế
- ✨ Tối giản, hiện đại, không "nhựa"
- 📱 Tối ưu cho mobile (touch-friendly)
- 🎯 Sử dụng Zalo Component có sẵn
- 💫 Animation mượt mà < 300ms
- 🔍 Typography rõ ràng, dễ đọc

## 📱 Zalo Components sử dụng

- **Input**: Search bar, text fields
- **Button**: Primary actions
- **Tabs**: Phân loại review
- **Icon**: Consistent iconography
- **Toast/Snackbar**: Notifications
- **Modal**: Confirmations

## 🔄 Roadmap

### Phase 1 (Current) ✅
- [x] Giao diện 3 màn hình chính
- [x] Mock data service
- [x] Responsive mobile design
- [x] Basic navigation

### Phase 2 (Next)
- [ ] Kết nối API thật
- [ ] Authentication với Zalo
- [ ] Upload hình ảnh cho review
- [ ] Share kết quả lên Zalo
- [ ] Push notifications
- [ ] Lịch sử tìm kiếm

### Phase 3 (Future)
- [ ] AI phát hiện shop lừa đảo
- [ ] Xác thực review bằng đơn hàng
- [ ] Community moderation
- [ ] Gamification (badges, points)
- [ ] Analytics dashboard

## 👨‍💻 Phát triển

### Mock Data
Hiện tại app sử dụng mock data trong `src/services/shop.service.ts`. Để kết nối API thực:

1. Tạo file `.env` với API endpoint
2. Cập nhật service methods
3. Xử lý authentication

### Thêm tính năng mới
1. Tạo component trong `src/components/`
2. Tạo page trong `src/pages/`
3. Thêm route trong `src/components/app.tsx`
4. Update types trong `src/types/`

## 📄 License

UNLICENSED - Private project

---

Made with ❤️ for Zalo Mini App Platform
