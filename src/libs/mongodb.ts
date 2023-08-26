import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
}

export default connectMongoDB;
