import { defineEventHandler, getQuery } from 'h3';
import { connectDB } from '../../../utils/db';
import { Review } from '../../../models/Review';

export default defineEventHandler(async (event) => {
  await connectDB();
  const query = getQuery(event) as { page?: string; limit?: string };
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || '10', 10), 1), 50);

  const total = await Review.countDocuments();
  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const items = reviews.map(review => ({
    id: review._id.toString(),
    shopId: review.shopId.toString(),
    userId: review.userId,
    userName: review.userName,
    rating: review.rating,
    content: review.content,
    type: review.type,
    createdAt: review.createdAt,
    helpful: review.helpful,
    images: review.images || []
  }));

  return {
    items,
    total,
    hasMore: page * limit < total,
    page
  };
});
