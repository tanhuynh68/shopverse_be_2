import express from "express";
import roomRoute from "../modules/chats/chat.routes.js";
import messageRoute from "../modules/messages/message.route.js";
import wishlistRoute from "../modules/wish-lists/wish-list.route.js";
import testRoute from "../modules/tests/test.route.js";

const router = express.Router();

router.use("/rooms", roomRoute);
router.use("/messages", messageRoute);
router.use("/wishlist", wishlistRoute);
router.use("/test", testRoute);

export default router;
