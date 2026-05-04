import express from "express";
import { createRoom } from "./chat.controllers.js";
import { validateBody } from "../../constants/index.js";
import { createRoomSchema } from "./chat.middleware.js";

const roomRoute = express.Router();
// auto create room for customer and shop when first order created successfully!
roomRoute.post("/", validateBody(createRoomSchema), createRoom);

export default roomRoute;
