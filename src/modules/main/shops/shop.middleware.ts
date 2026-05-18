import { z } from "zod";
import { MESSAGES } from "../../../messages/index.js";
import { SHOP_APPROVAL_STATUS } from "../../../constants/shop.constant.js";

export const userRequestBecomeShopValidate = z.object({
  shopName: z
    .string()
    .min(2, MESSAGES.SHOP_NAME_MIN)
    .max(100, MESSAGES.SHOP_NAME_MAX),

  hotline: z
    .string()
    .min(10, MESSAGES.HOTLINE_MIN)
    .max(15, MESSAGES.HOTLINE_MAX),

  address: z
    .string()
    .min(5, MESSAGES.ADDRESS_MIN)
    .max(255, MESSAGES.ADDRESS_MAX),
});

export const adminApproveRequestValidate = z.object({
  owner: z.string("owner is required"),
});

export const adminRejectRequestValidate = z.object({
  owner: z.string("owner is required"),
  rejectReason: z
    .string("rejectReason is required")
    .min(10, MESSAGES.SHOP_NAME_MIN)
    .max(200, MESSAGES.SHOP_NAME_MAX),
});

export const adminGetRequestsValidate = z.object({
  owner: z.string("owner must be a string"),

  approvalStatus: z.array(z.string(), "approvalStatus must be an array"),

  isDeleted: z.boolean("isDeleted must be a boolean"),
});