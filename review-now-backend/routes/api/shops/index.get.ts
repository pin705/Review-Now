import { defineEventHandler } from 'h3';
import { connectDB } from '../../../utils/db';
import { Shop } from '../../../models/Shop';

export default defineEventHandler(async (event) => {
  await connectDB();

  const shops = await Shop.find().lean();

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

  return formattedShops;
});
