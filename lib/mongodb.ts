import mongoose from 'mongoose';

/**
 * MongoDB Bağlantı Yönetimi
 * Global connection caching ile performans optimizasyonu
 */

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Lütfen MONGODB_URI environment variable tanımlayın (.env.local dosyasında)'
  );
}

/**
 * Global mongoose connection cache
 * Development modunda hot-reload sırasında bağlantı tekrarlanmasını önler
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * MongoDB bağlantı fonksiyonu
 * @returns Mongoose connection instance
 */
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('✅ MongoDB bağlantısı başarılı');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB bağlantı hatası:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;