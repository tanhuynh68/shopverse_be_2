// src/utils/cloudinary/uploadToCloudinary.ts


import streamifier from "streamifier";
import cloudinary from "../configs/cloudinary.config.js";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder = "chat"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);

        if (!result) {
          return reject(
            new Error("Upload failed")
          );
        }
        resolve(result.secure_url);
      }
    );

    streamifier
      .createReadStream(fileBuffer)
      .pipe(stream);
  });
};