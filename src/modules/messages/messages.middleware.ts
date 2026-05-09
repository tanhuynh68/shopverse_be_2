import { z } from "zod";
import { MESSAGE_TYPE } from "./message.schema.js";

export const createMediaValidate = z.object({
  roomId: z.string().min(1, "roomId is required"),
  type: z.enum([MESSAGE_TYPE.IMAGE, MESSAGE_TYPE.VIDEO], {
    message: "type must be IMAGE or VIDEO",
  }),
});

export const createTextMessageValidate = z.object({
  roomId: z.string().min(1, "roomId is required"),

  message: z
    .string()
    .trim()
    .min(1, "message is required")
    .max(1000, "message too long"),
});

export const getMessagesValidate = z.object({
  roomId: z.string().min(1, "roomId is required"),
});

export const sendOrderMessageValidate = z.object({
  roomId: z.string().min(1, "roomId is required"),
  orderId: z.string().min(1, "orderId is required"),
});

export const sendProductMessageValidate = z.object({
  roomId: z.string().min(1, "roomId is required"),
  productId: z.string().min(1, "productId is required"),
});
