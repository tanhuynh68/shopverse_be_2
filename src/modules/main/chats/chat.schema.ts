import mongoose from "mongoose";

const { Schema } = mongoose;

const chatRoomSchema = new Schema(
  {
    firstUser: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    secondUser: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
// only 1 cus + 1 shop
chatRoomSchema.index(
  { firstUser: 1, secondUser: 1 },
  { unique: true }
);

const ChatRoom = mongoose.model("chat_rooms", chatRoomSchema);

export default ChatRoom;