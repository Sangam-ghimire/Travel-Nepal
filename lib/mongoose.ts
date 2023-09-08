//here we are connecting to the database using mongoose
import mongoose from "mongoose";

// Declare a global variable to cache the connection, so we can use it again.
declare global {
  var mongoose: any;
}

//here we are getting the mongodb uri from the .env.local file
const MONGODB_URI = process.env.MONGODB_URI as string;

//here we are checking if the mongodb uri is present or not
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

//here we are checking if the cached variable is present or not
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

//here we are connecting to the database using mongoose
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    //here the cached.promise is used to cache the connection, because we don't want to connect to the database again and again
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  //here we are returning the cached.conn
  cached.conn = await cached.promise;
  return cached.conn;
}

//here we are exporting the dbConnect function
export default dbConnect;