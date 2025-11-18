import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

// Configure R2 client with hardcoded credentials
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID || 'c8dc00dc091a2fc3f23f67b80ecada48'}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '0e77e848422d50c9805ea64619ce2c91',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '37999e7aa416a0be5b8219cf3e74edc3d74ccdf966a3019bf543621b3b075e61',
  },
});

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'loreweaver-covers';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-ace38ee6a46144ba96aaa5f8132d76c7.r2.dev';

console.log('R2 configured with bucket:', R2_BUCKET_NAME);

/**
 * Upload base64 image to Cloudflare R2
 * @param base64Image - Base64 encoded image string (with or without data URL prefix)
 * @param folder - Folder path within bucket (default: 'review-now')
 * @returns Promise with uploaded image public URL
 */
export async function uploadImageToR2(
  base64Image: string,
  folder: string = 'review-now'
): Promise<string> {
  try {
    // Remove data URL prefix if present
    let base64Data = base64Image;
    let contentType = 'image/jpeg';
    
    if (base64Image.startsWith('data:')) {
      const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        contentType = matches[1];
        base64Data = matches[2];
      }
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate unique filename
    const fileExtension = contentType.split('/')[1] || 'jpg';
    const fileName = `${folder}/${crypto.randomUUID()}.${fileExtension}`;

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    });

    await r2Client.send(command);

    // Return public URL
    const publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error('R2 upload error:', error);
    throw new Error('Failed to upload image to R2');
  }
}

/**
 * Delete image from R2 by URL
 * @param imageUrl - Full R2 image URL
 */
export async function deleteImageFromR2(imageUrl: string): Promise<void> {
  try {
    // Extract file key from URL
    const url = new URL(imageUrl);
    const key = url.pathname.substring(1); // Remove leading slash

    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    console.log('Deleted image from R2:', key);
  } catch (error) {
    console.error('R2 delete error:', error);
    throw new Error('Failed to delete image from R2');
  }
}
