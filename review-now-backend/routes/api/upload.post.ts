import { defineEventHandler, readBody } from 'h3';
import { uploadImageToR2 } from '../../utils/r2';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { image, folder } = body;

    if (!image) {
      throw new Error('No image provided');
    }

    // Upload to R2
    const imageUrl = await uploadImageToR2(image, folder || 'review-now');

    return {
      success: true,
      url: imageUrl
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message || 'Upload failed'
    };
  }
});
