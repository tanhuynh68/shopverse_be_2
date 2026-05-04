import mongoose from "mongoose";

const { Schema } = mongoose;

const chatRoomSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    shopId: {
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
  { customerId: 1, shopId: 1 },
  { unique: true }
);

const ChatRoom = mongoose.model("chat_rooms", chatRoomSchema);

export default ChatRoom;