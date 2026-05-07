import dotenv from "dotenv";
dotenv.config();
const ENV = {
  PORT: process.env.PORT || 6000,
  DB_PASSWORD: process.env.DB_PASSWORD,
  TOKEN_EXPIRED: process.env.TOKEN_EXPIRED,
  SECRET: process.env.SECRET as string,
};

export default ENV;
