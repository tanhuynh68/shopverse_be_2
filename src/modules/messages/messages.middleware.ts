import { z } from "zod";
import { MESSAGE_TYPE } from "./message.schema.js";

export const createMediaValidate = z.object({
  roomId: z.string().min(1, "roomId is required"),
  type: z.enum(
    [
      MESSAGE_TYPE.IMAGE,
      MESSAGE_TYPE.VIDEO,
    ],
    {
      message:
        "type must be IMAGE or VIDEO",
    }
  ),
});