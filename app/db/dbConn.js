import mongoose from "mongoose";

export async function DBConnection() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_CONNECTION);
    console.log("Db is connected...");
  } catch (error) {
    console.log("DB is not connected....");
  }
}
