import { defineEventHandler } from 'h3';
import { Review } from '~/models/Review';
import { connectDB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  await connectDB();

  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return reviews.map(review => ({
    id: review._id.toString(),
    shopId: review.shopId.toString(),
    userId: review.userId,
    userName: review.userName,
    rating: review.rating,
    content: review.content,
    type: review.type,
    createdAt: review.createdAt,
    helpful: review.helpful,
    isFirstReview: (review as any).isFirstReview || false,
    needsModeration: (review as any).needsModeration || false,
    images: review.images || []
  }));
});
