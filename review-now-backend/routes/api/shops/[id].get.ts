import { defineEventHandler, getRouterParam } from 'h3';
import { connectDB } from '../../../utils/db';
import { Shop } from '../../../models/Shop';

export default defineEventHandler(async (event) => {
  await connectDB();

  const id = getRouterParam(event, 'id');

  if (!id) {
    return null;
  }

  const shop = await Shop.findById(id).lean();

  if (!shop) {
    return null;
  }

  return {
    id: shop._id.toString(),
    name: shop.name,
    phone: shop.phone,
    url: shop.url,
    platform: shop.platform,
    trustScore: shop.trustScore,
    totalReviews: shop.totalReviews,
    positiveReviews: shop.positiveReviews,
    negativeReviews: shop.negativeReviews,
    verified: shop.verified,
    createdDate: shop.createdDate,
    lastUpdated: shop.lastUpdated
  };
});
