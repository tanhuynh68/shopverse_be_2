import mongoose from "mongoose";

const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    name: { type: String, required: true }, // snapshot
    price: { type: Number, required: true }, // giá tại thời điểm checkout
    quantity: { type: Number, required: true },
    image: { type: String },
    totalPrice: { type: Number, required: true }, // quantity * price
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [orderItemSchema],
    subTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "CANCELED"],
      default: "PENDING",
    },
    payment: {
      method: {
        type: String,
        enum: ["VNPAY"],
        default: "VNPAY",
      },
      paymentId: { type: String }, // vnp_TxnRef
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("orders", orderSchema);

export default Order;
