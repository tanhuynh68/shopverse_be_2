import { z } from "zod";

export const createRoomSchema = z.object({
  secondUser: z.string().min(1, "secondUser is required"),
});

export const userGetRoomsSchema = z.object({
  userId: z.string().min(1, "userId is required"),
});