import { Request, Response } from "express";
import {
  createChatRoomService,
  customerGetRoomsService,
} from "./chat.services.js";
import { returnResponse } from "../../constants/index.js";
import { MESSAGES } from "../../messages/index.js";
import { getUserByIdService } from "../users/users.service.js";

export const createRoom = async (req: any, res: Response) => {
  try {
    // get id from user logged in;
    const {userId} = req.user;
    const { secondUser } = req.body;
    // get user
    const isUser = await getUserByIdService(secondUser);
    // check user
    if(!isUser){
      return returnResponse(MESSAGES.USER_NOT_FOUND, null, res, 404);
    }
    //
    const room = await createChatRoomService(userId, secondUser);
    return returnResponse(MESSAGES.CREATE_ROOM_SUCCESSFULLY, room, res, 201);
  } catch (error) {
    return returnResponse(MESSAGES.CREATE_ROOM_FAILED, error, res, 500);
  }
};

export const userGetRooms = async (req: any, res: Response) => {
  try {
    const { userId, role } = req.user;
    console.log({ userId, role })
    //
    const rooms = await customerGetRoomsService(userId, role);
    return returnResponse(MESSAGES.GET_ROOMS_SUCCESSFULLY, rooms, res, 200);
  } catch (error) {
    return returnResponse(MESSAGES.GET_ROOMS_FAILED, error, res, 500);
  }
};
