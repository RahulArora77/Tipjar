import mongoose from "mongoose";
const dburi=process.env.db_url as string

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(dburi);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}