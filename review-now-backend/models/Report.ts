import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
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
  reason: {
    type: String,
    enum: ['scam', 'fake-product', 'poor-service', 'not-delivery', 'duplicate-shop', 'wrong-info', 'other'],
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  evidence: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Report = mongoose.model('Report', reportSchema);
