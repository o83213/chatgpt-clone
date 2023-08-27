import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
  } catch (err) {
    console.log(err);
  }
}

export default connectMongoDB;
