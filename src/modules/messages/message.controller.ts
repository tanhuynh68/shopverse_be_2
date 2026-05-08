import { Request, Response } from "express";
import { returnResponse } from "../../constants/index.js";
import { uploadToCloudinary } from "../../utils/cloudinary.util.js";
import { MESSAGES } from "../../messages/index.js";
import { MESSAGE_TYPE } from "./message.schema.js";
import {
  createMessageMediaService,
  createTextMessageService,
  getMessagesService,
} from "./message.service.js";
import ChatRoom from "../chats/chat.schema.js";
import { getRoomById } from "../chats/chat.services.js";
import { getMessagesValidate } from "./messages.middleware.js";

export const createMessageMedia = async (req: any, res: Response) => {
  try {
    const { roomId, type } = req.body;
    console.log(req.user);
    const sender = req.user.userId; //current user
    // check room
    const isRoomExisted = await getRoomById(roomId);
    if (!isRoomExisted) {
      return returnResponse(MESSAGES.ROOM_NOT_FOUND, null, res, 404);
    }
    const files = req.files as Express.Multer.File[];
    // check file
    if (!files?.length) {
      return returnResponse("Files required", null, res, 400);
    }
    // upload files to clouldinary
    const mediaUrls = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "chat")),
    );
    // save to db
    const messages = await Promise.all(
      mediaUrls.map((url) =>
        createMessageMediaService(roomId, sender, type, url),
      ),
    );
    // update last message to show on sidebar
    await ChatRoom.findByIdAndUpdate(roomId, {
      lastMessage: type === MESSAGE_TYPE.IMAGE ? "📷 Image" : "🎬 Video",
      lastMessageAt: new Date(),
    });
    //
    return returnResponse(
      MESSAGES.CREATE_MEIDA_SUCCESSFULLY,
      messages,
      res,
      201,
    );
  } catch (error) {
    return returnResponse(MESSAGES.CREATE_MEDIA_FAILED, error, res, 500);
  }
};

export const createTextMessage = async (req: Request, res: Response) => {
  try {
    const { roomId, message } = req.body;
    const { userId } = req.user!; // make sure req.user existed
    // check room id existed or not
    const isRoomExisted = await getRoomById(roomId);
    if (!isRoomExisted) {
      return returnResponse(MESSAGES.ROOM_NOT_FOUND, null, res, 404);
    }
    const textMessage = await createTextMessageService(roomId, message, userId);
    return returnResponse(
      MESSAGES.CREATE_TEXT_MESSAGE_SUCCESSFULLY,
      textMessage,
      res,
      201,
    );
  } catch (error) {
    return returnResponse(MESSAGES.CREATE_TEXT_MESSAGE_FAILED, error, res, 500);
  }
};

export const getMessageByRoomId = async (req: Request, res: Response) => {
  try {
    const { roomId } = getMessagesValidate.parse(req.params);
    const { userId } = req.user!;
    // check room id existed or not
    const isRoomExisted = await getRoomById(roomId);
    if (!isRoomExisted) {
      return returnResponse(MESSAGES.ROOM_NOT_FOUND, null, res, 404);
    }
    const messages = await getMessagesService(roomId, userId);
    return returnResponse(
      MESSAGES.GET_MESSAGES_SUCCESSFULLY,
      messages,
      res,
      200,
    );
  } catch (error: any) {
    return returnResponse(MESSAGES.GET_MESSAGES_FAILED, error, res, 500);
  }
};
