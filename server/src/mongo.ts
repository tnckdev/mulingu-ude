import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { mongoClient: MongoClient };

export const mongoClient =
  globalForMongo.mongoClient || new MongoClient(process.env.MONGO_URI!);

if (process.env.NODE_ENV !== "production")
  globalForMongo.mongoClient = mongoClient;
 