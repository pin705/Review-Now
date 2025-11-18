import { defineEventHandler, getQuery, getRouterParam } from 'h3';
import { connectDB } from '../../../../utils/db';
import { Review } from '../../../../models/Review';

export default defineEventHandler(async (event) => {
  await connectDB();

  const shopId = getRouterParam(event, 'shopId');
  const query = getQuery(event) as { type?: string; page?: string; limit?: string };
  const { type } = query;
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || '10', 10), 1), 50);

  if (!shopId) {
    return [];
  }

  let filter: any = { shopId };

  if (type === 'positive' || type === 'negative') {
    filter.type = type;
  }

  const total = await Review.countDocuments(filter);
  const reviews = await Review.find(filter)
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
    helpful: review.helpful
  }));

  return {
    items,
    total,
    hasMore: page * limit < total,
    page
  };
});
