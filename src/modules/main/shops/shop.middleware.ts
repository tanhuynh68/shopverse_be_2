import { z } from "zod";
import { MESSAGES } from "../../../messages/index.js";

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
  owner: z
    .string('owner is required')
});
