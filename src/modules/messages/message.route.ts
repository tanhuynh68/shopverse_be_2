import express from "express";
import { validateBody, validateParams } from "../../constants/index.js";
import { isLogin } from "../../middlewares/jwt/jwt.middleware.js";
import { createMediaValidate, createTextMessageValidate, getMessagesValidate } from "./messages.middleware.js";
import { createMessageMedia, createTextMessage, getMessageByRoomId } from "./message.controller.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { validateUploadFiles } from "../../middlewares/validateUpload.middleware.js";

const messageRoute = express.Router();
// auto create room for customer and shop when first order created successfully!
messageRoute.post(
  "/upload",
  isLogin,
  upload.array("files", 10),
  validateBody(createMediaValidate),
  validateUploadFiles,
  createMessageMedia,
);

messageRoute.post(
  "/",
  isLogin,
  validateBody(createTextMessageValidate),
  createTextMessage,
);

messageRoute.get(
  "/room/:roomId",
  isLogin,
  // validateParams(getMessagesValidate),
  getMessageByRoomId,
);
export default messageRoute;
