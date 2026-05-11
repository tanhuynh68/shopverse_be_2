import mongoose, { Schema, Document, Types, model } from "mongoose";

export interface IWishlist extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  isActive: boolean;
  notifyPriceDrop: boolean;
  notifyBackInStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    notifyPriceDrop: {
      type: Boolean,
      default: false,
    },

    notifyBackInStock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// create wishlist with 1 userId and 1 productId 1 time
wishlistSchema.index(
  { userId: 1, productId: 1 },
  { unique: true }
);
const WishList = model<IWishlist>("Wishlist", wishlistSchema);
export default WishList;