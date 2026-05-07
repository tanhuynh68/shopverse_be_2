import multer from "multer";

// check file valid or not
export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter(req, file, cb) {
    const allowTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "video/mp4",
      "video/quicktime",
      "video/webm",
    ];

    if (allowTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"));
    }
  },
});