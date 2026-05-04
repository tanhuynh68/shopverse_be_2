import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "chat_rooms",
      required: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    text: {
      type: String,
      default: "",
      trim: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      default: null,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "orders",
      default: null,
    },

    images: [
      {
        type: String,
      },
    ],

    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// query tin nhắn theo room nhanh hơn
messageSchema.index({ roomId: 1, createdAt: -1 });

const Message = mongoose.model("messages", messageSchema);

export default Message;