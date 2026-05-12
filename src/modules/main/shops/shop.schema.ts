import mongoose from "mongoose";

const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    normalizedName: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    hotline: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    rejectReason: String,
  },
  { timestamps: true },
);
const Shop = mongoose.model("shop", shopSchema)
export default Shop;
