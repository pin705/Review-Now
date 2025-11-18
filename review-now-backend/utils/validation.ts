import { UserActivity } from '../models/UserActivity';

const DAILY_SHOP_CREATION_LIMIT = 3;

export async function checkShopCreationLimit(userId: string): Promise<{ allowed: boolean; count: number; limit: number }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const count = await UserActivity.countDocuments({
    userId,
    activityType: 'create_shop',
    createdAt: { $gte: today }
  });
  
  return {
    allowed: count < DAILY_SHOP_CREATION_LIMIT,
    count,
    limit: DAILY_SHOP_CREATION_LIMIT
  };
}

export async function recordShopCreation(userId: string, shopId: string): Promise<void> {
  await UserActivity.create({
    userId,
    activityType: 'create_shop',
    targetId: shopId
  });
}

export async function checkDuplicatePhone(phone: string): Promise<boolean> {
  const { Shop } = await import('../models/Shop');
  const existing = await Shop.findOne({ phone });
  return !!existing;
}

export async function checkReviewCount(shopId: string, excludeCreator: boolean = true): Promise<number> {
  const { Review } = await import('../models/Review');
  const { Shop } = await import('../models/Shop');
  
  const shop = await Shop.findById(shopId);
  if (!shop) return 0;
  
  if (excludeCreator) {
    // Count reviews from users other than the creator
    const count = await Review.countDocuments({
      shopId,
      userId: { $ne: shop.createdBy }
    });
    return count;
  }
  
  return await Review.countDocuments({ shopId });
}

export async function updateModerationStatus(shopId: string): Promise<void> {
  const { Shop } = await import('../models/Shop');
  const { Review } = await import('../models/Review');
  
  const shop = await Shop.findById(shopId);
  if (!shop) return;
  
  // Count reviews from other users (not the creator)
  const otherUsersReviewCount = await Review.countDocuments({
    shopId,
    userId: { $ne: shop.createdBy }
  });
  
  // If there are 2 or more reviews from other users, remove moderation
  if (otherUsersReviewCount >= 2 && shop.needsModeration) {
    await Shop.findByIdAndUpdate(shopId, { needsModeration: false });
    
    // Update all first reviews to not need moderation
    await Review.updateMany(
      { shopId, isFirstReview: true },
      { needsModeration: false }
    );
  }
}
