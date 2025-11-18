import { defineEventHandler, getRouterParam } from 'h3';
import { connectDB } from '../../../../utils/db';
import { Shop } from '../../../../models/Shop';
import { Review } from '../../../../models/Review';

export default defineEventHandler(async (event) => {
  await connectDB();

  const shopId = getRouterParam(event, 'shopId');

  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  // Delete all reviews of this shop
  await Review.deleteMany({ shopId });

  // Delete the shop
  await Shop.findByIdAndDelete(shopId);

  return { success: true };
});
