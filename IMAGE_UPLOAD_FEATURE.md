# Image Upload Feature - Cloudinary Integration

## Overview
Added image upload functionality to Review Now using Cloudinary for both shop creation and review submission.

## What Changed

### Backend (`review-now-backend/`)

1. **Installed Dependencies**
   - `cloudinary` package for image upload

2. **Environment Variables** (`.env`)
   ```env
   CLOUDINARY_CLOUD_NAME=carlogs
   CLOUDINARY_API_KEY=446482162947785
   CLOUDINARY_API_SECRET=fgPF-JKSFslpGIbvejG0-E1KAkQ
   ```

3. **Cloudinary Utility** (`utils/cloudinary.ts`)
   - Configured Cloudinary SDK
   - `uploadImageToCloudinary()` - Handles base64 image upload with auto optimization
   - `deleteImageFromCloudinary()` - Delete images if needed

4. **Upload API** (`routes/api/upload.post.ts`)
   - POST `/api/upload` - Receives base64 image, uploads to Cloudinary, returns URL

5. **Updated Models**
   - `models/Review.ts` - Added `images: [String]` field
   - `models/Shop.ts` - Added `images: [String]` field

6. **Updated API Routes**
   - `routes/api/reviews/index.post.ts` - Accept and save images array
   - `routes/api/reviews/index.get.ts` - Return images in response
   - `routes/api/shops/[shopId]/reviews.get.ts` - Return images in reviews
   - `routes/api/shops/index.post.ts` - Accept and save shop images

### Frontend (`src/`)

1. **Updated Types** (`types/index.ts`)
   - Added `images?: string[]` to Review interface
   - Added `images?: string[]` to Shop interface

2. **Service Updates** (`services/shop.service.ts`)
   - Added `uploadImage(base64Image, folder)` method
   - Updated `createShop()` to accept images
   - Updated `addReview()` to accept images

3. **New Component** (`components/ImageUploader.tsx`)
   - Reusable image upload component
   - Features:
     - Multiple image selection (configurable max)
     - File validation (type, size max 5MB)
     - Preview with remove option
     - Auto-upload to Cloudinary via service
     - Base64 conversion for web upload

4. **ReviewPage Updates** (`pages/ReviewPage.tsx`)
   - Added ImageUploader component
   - Images state management
   - Sends images array when submitting review

5. **AddShopPage Updates** (`pages/AddShopPage.tsx`)
   - Added ImageUploader for shop images
   - Images state management
   - Sends images when creating shop and initial review

6. **ReviewCard Updates** (`components/ReviewCard.tsx`)
   - Display review images in 3-column grid
   - Click to open full size in new tab
   - Only shows if images exist

## How It Works

### Upload Flow
1. User selects image(s) from device
2. Frontend validates file type and size
3. File converted to base64
4. POST to `/api/upload` with base64 data
5. Backend uploads to Cloudinary with optimization
6. Cloudinary URL returned and saved in state
7. When submitting review/shop, URLs sent to backend
8. Backend saves URLs in MongoDB

### Image Optimization (Cloudinary)
- Max size: 1200x1200px
- Auto quality optimization
- Auto format (WebP when supported)
- Organized in folders: `reviews/`, `reports/`, `shops/`

## Usage

### For Reviews
1. Go to shop detail → "Đánh giá" button
2. Write review and rating
3. Click "Thêm ảnh" to upload images (max 5)
4. Submit review with images

### For New Shops
1. Navigate to "Thêm shop mới"
2. Fill shop details
3. Upload shop images in "Hình ảnh shop" section
4. Submit to create shop with images

## API Endpoints

### Upload Image
```
POST /api/upload
Body: { image: "data:image/jpeg;base64,...", folder: "reviews" }
Response: { success: true, url: "https://res.cloudinary.com/..." }
```

### Create Review with Images
```
POST /api/reviews
Body: { 
  shopId, userId, userName, rating, content, type,
  images: ["url1", "url2"]
}
```

### Create Shop with Images
```
POST /api/shops
Body: {
  name, phone, link, platform, verified,
  images: ["url1", "url2"]
}
```

## Testing

1. **Start Backend**
   ```bash
   cd review-now-backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```

3. **Test Upload**
   - Create a review and upload images
   - Create a new shop with images
   - Verify images appear in ReviewCard
   - Check Cloudinary dashboard for uploaded images

## Limitations
- Max 5 images per review/shop
- Max 5MB per image
- Supported: jpg, png, gif, webp
- Images optimized automatically by Cloudinary

## Future Enhancements
- Image compression before upload
- Multiple image upload in one request
- Image cropping/editing before upload
- Gallery viewer with swipe
- Delete uploaded images before submit
