import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carepulse';

  try {
    // Attempt standard connection to MongoDB with short timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`✅ MongoDB Connected to: ${uri}`);
  } catch (err) {
    console.warn(`⚠️ Local MongoDB not detected (${err.message}). Starting embedded high-performance MongoDB engine...`);
    try {
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri();
      await mongoose.connect(memoryUri);
      console.log(`✅ Embedded In-Memory MongoDB running and connected at: ${memoryUri}`);
    } catch (memErr) {
      console.error('❌ Failed to connect to any MongoDB instance:', memErr.message);
      process.exit(1);
    }
  }
};

