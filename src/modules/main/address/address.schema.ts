import mongoose, { Schema } from "mongoose";
import { AddressLabel } from "../../../constants/address.js";

export const addressSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    province: {
      type: String,
      required: true,
      trim: true,
    },

    ward: {
      type: String,
      required: true,
      trim: true,
    },

    specificAddress: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      enum: Object.values(AddressLabel),
      default: AddressLabel.HOME,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Address = mongoose.model(
  "address",
  addressSchema
);
