# Hướng dẫn Chạy Review Now

## 🚀 Quick Start

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Build CSS
```bash
npm run build:css
```

### 3. Chạy App
```bash
npm start
```

App sẽ chạy tại cổng mặc định của Zalo Mini Program. Mở Zalo Developer Tools để test.

## 📝 Checklist Trước Khi Chạy

- ✅ Node.js version >= 14
- ✅ Đã cài đặt Zalo Mini App DevTools
- ✅ Đã chạy `npm install`
- ✅ Đã chạy `npm run build:css`

## 🔧 Troubleshooting

### Lỗi: Cannot find module 'react'
```bash
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: CSS không load
```bash
npm run build:css
```

### Lỗi khi deploy
Kiểm tra file `app-config.json` và đảm bảo tất cả thông tin đã được cập nhật đúng.

## 📱 Test trên Thiết Bị Thật

1. Build app: `npm run build`
2. Deploy: `npm run deploy`
3. Quét QR code từ Zalo DevTools
4. Test trên điện thoại

## 🎯 Features Đã Hoàn Thành

- ✅ Màn hình tìm kiếm shop (SearchPage)
- ✅ Màn hình chi tiết shop (ShopProfilePage)
- ✅ Màn hình đánh giá/báo cáo (ReviewPage)
- ✅ Components: TrustScoreCard, ReviewCard, EmptyState, LoadingSpinner
- ✅ Mock data service
- ✅ Routing giữa các màn hình
- ✅ Responsive design cho mobile

## 📂 Cấu Trúc Code

```
src/
├── components/       # Reusable components
├── pages/           # 3 màn hình chính
├── services/        # API services (mock)
├── data/            # Mock data
├── types/           # TypeScript definitions
├── utils/           # Helper functions
├── state/           # Recoil state management
└── css/             # Styles
```

## 🎨 Customization

### Thay đổi màu chủ đạo
Sửa trong `src/css/tailwind.css`:
```css
:root {
  --primary-color: #3b82f6;  /* Thay đổi màu này */
}
```

### Thêm mock shop mới
Sửa `src/data/mockData.ts` và thêm shop vào array `mockShops`.

### Kết nối API thực
Sửa file `src/services/shop.service.ts` và thay thế mock data bằng API calls.

## 📞 Support

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ qua Zalo.
