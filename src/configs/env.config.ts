import dotenv from "dotenv";
dotenv.config();
const ENV = {
  PORT: process.env.PORT || 6000,
  DB_PASSWORD: process.env.DB_PASSWORD,
  TOKEN_EXPIRED: process.env.TOKEN_EXPIRED,
  SECRET: process.env.SECRET as string,
  // cloudinary
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default ENV;
