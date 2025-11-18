import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['positive', 'negative'],
    required: true
  },
  helpful: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
reviewSchema.index({ shopId: 1, createdAt: -1 });
reviewSchema.index({ createdAt: -1 });

export const Review = mongoose.model('Review', reviewSchema);
