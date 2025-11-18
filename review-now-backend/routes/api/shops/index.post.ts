import { defineEventHandler, readBody, createError } from 'h3';
import { connectDB } from '../../../utils/db';
import { Shop } from '../../../models/Shop';
import { checkShopCreationLimit, recordShopCreation, checkDuplicatePhone } from '../../../utils/validation';

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);
  const { name, phone, link, platform, verified, images, userId } = body;

  // Validate userId is provided
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    });
  }

  // Check daily shop creation limit
  const limitCheck = await checkShopCreationLimit(userId);
  if (!limitCheck.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: `Bạn đã đạt giới hạn tạo shop hôm nay (${limitCheck.limit} shop/ngày). Vui lòng thử lại vào ngày mai.`
    });
  }

  // Check for duplicate phone number
  if (phone) {
    const isDuplicate = await checkDuplicatePhone(phone);
    if (isDuplicate) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Số điện thoại này đã tồn tại trong hệ thống. Không thể tạo shop trùng lặp.'
      });
    }
  }

  const newShop = await Shop.create({
    name,
    phone,
    url: link,
    platform,
    verified,
    createdBy: userId,
    needsModeration: true, // New shops need moderation
    trustScore: 50,
    totalReviews: 0,
    positiveReviews: 0,
    negativeReviews: 0,
    images: images || []
  });

  // Record user activity
  await recordShopCreation(userId, newShop._id.toString());

  return {
    id: newShop._id.toString(),
    name: newShop.name,
    phone: newShop.phone,
    url: newShop.url,
    platform: newShop.platform,
    trustScore: newShop.trustScore,
    totalReviews: newShop.totalReviews,
    positiveReviews: newShop.positiveReviews,
    negativeReviews: newShop.negativeReviews,
    verified: newShop.verified,
    createdBy: newShop.createdBy,
    needsModeration: newShop.needsModeration,
    createdDate: newShop.createdDate,
    lastUpdated: newShop.lastUpdated,
    images: newShop.images || []
  };
});
