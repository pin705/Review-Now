import { defineEventHandler } from 'h3';
import { connectDB } from '../../../utils/db';
import { Review } from '../../../models/Review';

export default defineEventHandler(async (event) => {
  await connectDB();

  const reviews = await Review.find().sort({ createdAt: -1 }).lean();

  return reviews.map(review => ({
    id: review._id.toString(),
    shopId: review.shopId.toString(),
    userId: review.userId,
    userName: review.userName,
    rating: review.rating,
    content: review.content,
    type: review.type,
    createdAt: review.createdAt,
    helpful: review.helpful
  }));
});
