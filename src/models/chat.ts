import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema({
  name: String,
  avatar: String,
});

const messageSchema = new Schema(
  {
    text: String,
    author: authorSchema,
  },
  {
    timestamps: true,
  }
);

const chatScehma = new Schema(
  {
    userEmail: String,
    message: [messageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatScehma);

export default Chat;
