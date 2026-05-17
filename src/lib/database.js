import mongoose from 'mongoose';
import serverConfig from '../config/env.js';
import logger from '../util/logger.js';
export const connectDB = async () => {
  try {
    await mongoose.connect(serverConfig.MONGODB_URI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
}
