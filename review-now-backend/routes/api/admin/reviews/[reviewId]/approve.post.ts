import { defineEventHandler, getRouterParam } from 'h3';
import { connectDB } from '../../../../../utils/db';
import { Review } from '../../../../../models/Review';
import { updateModerationStatus } from '../../../../../utils/validation';

export default defineEventHandler(async (event) => {
  await connectDB();

  const reviewId = getRouterParam(event, 'reviewId');

  if (!reviewId) {
    throw new Error('Review ID is required');
  }

  const review = await Review.findByIdAndUpdate(
    reviewId,
    { needsModeration: false },
    { new: true }
  );

  if (!review) {
    throw new Error('Review not found');
  }

  // Update shop moderation status
  await updateModerationStatus(review.shopId.toString());

  return {
    id: review._id.toString(),
    needsModeration: false
  };
});
