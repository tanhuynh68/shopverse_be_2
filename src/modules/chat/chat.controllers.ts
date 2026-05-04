import { Request, Response } from "express";
import { createChatRoomService } from "./chat.services.js";
import { returnResponse } from "../../constants/index.js";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { customerId, shopId } = req.body;
    //
    const room = await createChatRoomService(customerId, shopId);
    return returnResponse('', room, res, 201);
  } catch (error) {
    return returnResponse('', error, res, 500);
  }
};
