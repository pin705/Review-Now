import { defineEventHandler, readBody } from 'h3';
import { connectDB } from '../../../utils/db';
import { Review } from '../../../models/Review';
import { Shop } from '../../../models/Shop';
import { updateModerationStatus } from '../../../utils/validation';

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);
  const { shopId, userId, userName, rating, content, type, images } = body;

  // Get shop to check if user is creator
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  const isCreator = shop.createdBy === userId;
  const isFirstReview = isCreator && shop.totalReviews === 0;

  // Create review
  const newReview = await Review.create({
    shopId,
    userId,
    userName,
    rating,
    content,
    type,
    helpful: 0,
    isFirstReview,
    needsModeration: isFirstReview && shop.needsModeration,
    images: images || []
  });

  // Update shop statistics
  shop.totalReviews += 1;
  if (type === 'positive') {
    shop.positiveReviews += 1;
  } else {
    shop.negativeReviews += 1;
  }
  
  // Recalculate trust score based on positive/negative ratio
  const positiveRatio = shop.totalReviews > 0 
    ? shop.positiveReviews / shop.totalReviews 
    : 0.5;
  shop.trustScore = Math.round(positiveRatio * 100);
  shop.lastUpdated = new Date();
  
  await shop.save();

  // Check if moderation status should be updated
  await updateModerationStatus(shopId);

  return {
    id: newReview._id.toString(),
    shopId: newReview.shopId.toString(),
    userId: newReview.userId,
    userName: newReview.userName,
    rating: newReview.rating,
    content: newReview.content,
    type: newReview.type,
    createdAt: newReview.createdAt,
    helpful: newReview.helpful,
    isFirstReview: newReview.isFirstReview,
    needsModeration: newReview.needsModeration,
    images: newReview.images || []
  };
});
