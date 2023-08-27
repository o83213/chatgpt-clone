import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    text: String,
    author: {
      email: String,
      name: String,
      avatar: String,
    },
  },
  {
    timestamps: true,
  }
);

const chatScehma = new Schema(
  {
    userEmail: String,
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatScehma);

export default Chat;
