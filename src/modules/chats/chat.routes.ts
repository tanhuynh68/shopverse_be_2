import express from "express";
import { createRoom, userGetRooms } from "./chat.controllers.js";
import { validateBody } from "../../constants/index.js";
import { createRoomSchema, userGetRoomsSchema } from "./chat.middleware.js";
import { isLogin } from "../../middlewares/jwt/jwt.middleware.js";

const roomRoute = express.Router();

// auto create room for customer and shop when first order created successfully!
roomRoute.post("/", isLogin, validateBody(createRoomSchema), createRoom);
// user get room list to connect
roomRoute.get("/", isLogin, userGetRooms);

export default roomRoute;
