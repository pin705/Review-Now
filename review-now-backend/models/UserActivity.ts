import mongoose from 'mongoose';

// Track user activities for rate limiting
const userActivitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  activityType: {
    type: String,
    enum: ['create_shop', 'create_review', 'report'],
    required: true
  },
  targetId: {
    type: String, // Shop ID or Review ID
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours (1 day)
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
userActivitySchema.index({ userId: 1, activityType: 1, createdAt: -1 });

export const UserActivity = mongoose.model('UserActivity', userActivitySchema);
