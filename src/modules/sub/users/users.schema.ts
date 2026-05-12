import mongoose from "mongoose";
import { ROLE } from "../../../constants/role.constant.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, default: null }, // google account = null
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: {
      type: [String],
      enum: [ROLE.CUSTOMER, ROLE.SHOP, ROLE.ADMIN],
      default: [ROLE.CUSTOMER],
    },
    verifyCode: { type: String, default: null },
    verifyCodeExpiresAt: { type: Date, default: null },
    avatar: { type: String },
    phone: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
    accountType: {
      type: String,
      enum: ["NORMAL", "GOOGLE"],
      default: "NORMAL",
    },
    // when register = google, user will not have passwword, use this field to show for fe
    isPasswordExisted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

var User = mongoose.model("user", userSchema);
export default User;
