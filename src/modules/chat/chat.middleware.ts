import { z } from "zod";

export const createRoomSchema = z.object({
  customerId: z.string().min(1, "customerId is required"),
  shopId: z.string().min(1, "shopId is required"),
});