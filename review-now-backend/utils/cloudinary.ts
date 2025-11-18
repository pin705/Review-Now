import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary - hardcoded credentials
cloudinary.config({
  cloud_name: 'carlogs',
  api_key: '446482162947785',
  api_secret: 'fgPF-JKSFslpGIbvejG0-E1KAkQ',
  secure: true
});

console.log('Cloudinary configured with cloud_name: carlogs');

/**
 * Upload base64 image to Cloudinary
 * @param base64Image - Base64 encoded image string (with or without data URL prefix)
 * @param folder - Cloudinary folder name (default: 'review-now')
 * @returns Promise with uploaded image URL
 */
export async function uploadImageToCloudinary(
  base64Image: string,
  folder: string = 'review-now'
): Promise<string> {
  try {
    // Ensure base64 has proper data URL prefix
    let imageData = base64Image;
    if (!base64Image.startsWith('data:')) {
      imageData = `data:image/jpeg;base64,${base64Image}`;
    }

    const result = await cloudinary.uploader.upload(imageData, {
      folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' }, // Max size
        { quality: 'auto:good' }, // Auto quality
        { fetch_format: 'auto' } // Auto format (WebP if supported)
      ]
    });

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Delete image from Cloudinary by URL
 * @param imageUrl - Full Cloudinary image URL
 */
export async function deleteImageFromCloudinary(imageUrl: string): Promise<void> {
  try {
    // Extract public_id from Cloudinary URL
    const urlParts = imageUrl.split('/');
    const fileWithExt = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];
    
    if (!fileWithExt || !folder) {
      console.warn('Invalid Cloudinary URL format');
      return;
    }
    
    const publicId = `${folder}/${fileWithExt.split('.')[0]}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    // Don't throw - deletion failure shouldn't block operations
  }
}

export { cloudinary };
