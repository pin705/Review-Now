import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/review-now';
    
    await mongoose.connect(mongoUri);
    
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export function disconnectDB() {
  if (!isConnected) {
    return;
  }
  
  mongoose.disconnect();
  isConnected = false;
}
