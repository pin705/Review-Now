import { defineEventHandler, readBody } from 'h3';
import { connectDB } from '../../../utils/db';
import { Shop } from '../../../models/Shop';

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);
  const { name, phone, link, platform, verified } = body;

  const newShop = await Shop.create({
    name,
    phone,
    url: link,
    platform,
    verified,
    trustScore: 50,
    totalReviews: 0,
    positiveReviews: 0,
    negativeReviews: 0
  });

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
    createdDate: newShop.createdDate,
    lastUpdated: newShop.lastUpdated
  };
});
