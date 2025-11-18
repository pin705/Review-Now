import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    index: true
  },
  url: {
    type: String,
    trim: true
  },
  platform: {
    type: String,
    enum: ['facebook', 'shopee', 'lazada', 'tiktok', 'zalo', 'other'],
    required: true
  },
  trustScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  positiveReviews: {
    type: Number,
    default: 0
  },
  negativeReviews: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  images: {
    type: [String],
    default: []
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search
shopSchema.index({ name: 'text' });
shopSchema.index({ phone: 1 });

export const Shop = mongoose.model('Shop', shopSchema);
