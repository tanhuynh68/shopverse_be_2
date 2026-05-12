import { Request, Response } from "express";
import { uploadToCloudinary } from "../../../utils/cloudinary.util.js";
import { MESSAGES } from "../../../messages/index.js";
import { MESSAGE_TYPE } from "./message.schema.js";
import {
  createMessageMediaService,
  createTextMessageService,
  getMessagesService,
  sendOrderMessageService,
  sendProductMessageService,
} from "./message.service.js";
import ChatRoom from "../chats/chat.schema.js";
import { getRoomById } from "../chats/chat.services.js";
import { getMessagesValidate } from "./messages.middleware.js";
import { getOrderById } from "../../sub/orders/order.service.js";
import {
  getProductByIdService,
  getProductByShopId,
} from "../../sub/products/product.service.js";
import { ROLE } from "../../../constants/role.constant.js";
import { returnResponse } from "../../../utils/return.util.js";

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
    // upload files to cloudinary
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
      MESSAGES.CREATE_MEDIA_SUCCESSFULLY,
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

/**
 * user send order to chat box
 * @param req
 * @param res
 * @returns order message
 */
export const sendOrderMessage = async (req: Request, res: Response) => {
  try {
    const { roomId, orderId } = req.body;
    const { userId } = req.user!; // make sure req.user existed
    // check room id existed or not
    const isRoomExisted = await getRoomById(roomId);
    if (!isRoomExisted) {
      return returnResponse(MESSAGES.ROOM_NOT_FOUND, null, res, 404);
    }
    // check order id existed or not
    const isOrderExisted = await getOrderById(orderId);
    if (!isOrderExisted) {
      return returnResponse(MESSAGES.ORDER_NOT_FOUND, null, res, 404);
    }
    //
    const orderMessage = await sendOrderMessageService(roomId, orderId, userId);
    return returnResponse(
      MESSAGES.SEND_ORDER_MESSAGE_SUCCESSFULLY,
      orderMessage,
      res,
      201,
    );
  } catch (error) {
    return returnResponse(MESSAGES.SEND_ORDER_MESSAGE_FAILED, error, res, 500);
  }
};
/**
 * user send product to chat box
 * @param req
 * @param res
 * @returns
 */
export const sendProductMessage = async (req: Request, res: Response) => {
  try {
    const { roomId, productId, shopId } = req.body;
    const { userId, role } = req.user!; // make sure req.user existed
    // check product id existed or not
    const isProductExisted = await getProductByIdService(productId);
    if (!isProductExisted) {
      return returnResponse(MESSAGES.PRODUCT_NOT_FOUND, null, res, 404);
    }
    // current user is shop
    if (role === ROLE.SHOP) {
      // check product belong to shop who is current user
      const isProductBelongToShop = await getProductByShopId(productId, userId);
      if (!isProductBelongToShop) {
        return returnResponse(MESSAGES.PRODUCT_IS_NOT_YOURS, null, res, 400);
      }
    } //if current user is customer
    if (role === ROLE.CUSTOMER) {
      // check product belong to shop who is chatting with current user (customer or admin)
      const isProductBelongToShop = await getProductByShopId(productId, shopId);
      if (!isProductBelongToShop) {
        return returnResponse(
          MESSAGES.PRODUCT_IS_NOT_BELONG_TO_SHOP,
          null,
          res,
          400,
        );
      }
    }
    // check room id existed or not
    const isRoomExisted = await getRoomById(roomId);
    if (!isRoomExisted) {
      return returnResponse(MESSAGES.ROOM_NOT_FOUND, null, res, 404);
    }
    //
    const productMessage = await sendProductMessageService(
      roomId,
      productId,
      userId,
    );
    return returnResponse(
      MESSAGES.SEND_PRODUCT_MESSAGE_SUCCESSFULLY,
      productMessage,
      res,
      201,
    );
  } catch (error) {
    return returnResponse(
      MESSAGES.SEND_PRODUCT_MESSAGE_FAILED,
      error,
      res,
      500,
    );
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
