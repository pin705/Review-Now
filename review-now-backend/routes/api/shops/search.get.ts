import { defineEventHandler, getQuery } from 'h3';
import { connectDB } from '../../../utils/db';
import { Shop } from '../../../models/Shop';

export default defineEventHandler(async (event) => {
  await connectDB();

  const query = getQuery(event);
  const { q, type } = query as { q?: string; type?: string; page?: string; limit?: string };
  const page = Math.max(parseInt((query as any).page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt((query as any).limit || '10', 10), 1), 50);

  if (!q || !type) {
    return {
      shops: [],
      hasMore: false,
      total: 0
    };
  }

  let filter: any = {};

  if (type === 'phone') {
    filter.phone = { $regex: q, $options: 'i' };
  } else if (type === 'name') {
    filter.name = { $regex: q, $options: 'i' };
  } else if (type === 'link') {
    filter.url = { $regex: q, $options: 'i' };
  }

  const total = await Shop.countDocuments(filter);
  const shops = await Shop.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const formattedShops = shops.map(shop => ({
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
  }));

  return {
    shops: formattedShops,
    hasMore: page * limit < total,
    total
  };
});
