import express from "express";
import { isLogin } from "../../../middlewares/jwt/jwt.middleware.js";
import { createMediaValidate, createTextMessageValidate, getMessagesValidate, sendOrderMessageValidate, sendProductMessageValidate } from "./messages.middleware.js";
import { createMessageMedia, createTextMessage, getMessageByRoomId, sendOrderMessage, sendProductMessage } from "./message.controller.js";
import { upload } from "../../../middlewares/upload.middleware.js";
import { validateUploadFiles } from "../../../middlewares/validateUpload.middleware.js";
import { validateBody } from "../../../utils/validate.util.js";

const messageRoute = express.Router();
// user send image or video message in chat box
messageRoute.post(
  "/upload",
  isLogin,
  upload.array("files", 10),
  validateBody(createMediaValidate),
  validateUploadFiles,
  createMessageMedia,
);
// user send text message in chat box
messageRoute.post(
  "/text",
  isLogin,
  validateBody(createTextMessageValidate),
  createTextMessage,
);

// user send order message in chat box
messageRoute.post(
  "/order",
  isLogin,
  validateBody(sendOrderMessageValidate),
  sendOrderMessage,
);

// user send product message in chat box
messageRoute.post(
  "/product",
  isLogin,
  validateBody(sendProductMessageValidate),
  sendProductMessage,
);

// get messages by roomId
messageRoute.get(
  "/room/:roomId",
  isLogin,
  getMessageByRoomId,
);

export default messageRoute;
