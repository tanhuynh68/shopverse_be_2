// src/middlewares/validateUpload.middleware.ts

import { Request, Response, NextFunction } from "express";
import { MESSAGE_TYPE } from "../modules/messages/message.schema.js";

export const validateUploadFiles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files =
    req.files as Express.Multer.File[];

  const { type } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).json({
      message: "Files are required",
    });
  }

  if (type === MESSAGE_TYPE.IMAGE) {
    const invalid = files.some(
      (file) =>
        !file.mimetype.startsWith(
          "image/"
        )
    );

    if (invalid) {
      return res.status(400).json({
        message:
          "Only image files allowed",
      });
    }
  }

  if (type === MESSAGE_TYPE.VIDEO) {
    const invalid = files.some(
      (file) =>
        !file.mimetype.startsWith(
          "video/"
        )
    );

    if (invalid) {
      return res.status(400).json({
        message:
          "Only video files allowed",
      });
    }
  }

  next();
};