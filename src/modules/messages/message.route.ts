import express from "express";
import { validateBody } from "../../constants/index.js";
import { isLogin } from "../../middlewares/jwt/jwt.middleware.js";
import { createMediaValidate } from "./messages.middleware.js";
import { createMessageMedia } from "./message.controller.js";
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

export default messageRoute;
