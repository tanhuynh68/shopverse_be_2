import mongoose, { Schema } from "mongoose";

export enum MESSAGE_TYPE {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  PRODUCT = "PRODUCT",
  ORDER = "ORDER",
}

const messageSchema = new Schema(
  {
    // id
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "chat_rooms",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(MESSAGE_TYPE),
      default: MESSAGE_TYPE.TEXT,
    },

    // text message
    message: {
      type: String,
      trim: true,
      default: "",
    },

    // image/video
    mediaUrl: {
      type: String,
      default: null,
    },

    // product id
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    // order id
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    isSeen: {
      type: Boolean,
      default: false,
    },

    seenAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({
  room: 1,
  createdAt: -1,
});

const Message = mongoose.model(
  "message",
  messageSchema
);

export default Message;