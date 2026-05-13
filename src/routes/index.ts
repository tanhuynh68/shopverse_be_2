import express from "express";
import roomRoute from "../modules/main/chats/chat.routes.js";
import messageRoute from "../modules/main/messages/message.route.js";
import wishlistRoute from "../modules/main/wish-lists/wish-list.route.js";
import testRoute from "../modules/sub/tests/test.route.js";
import shopRoute from "../modules/main/shops/shop.route.js";
import authRoute from "../modules/main/auth/auth.route.js";

const router = express.Router();

router.use("/rooms", roomRoute);
router.use("/messages", messageRoute);
router.use("/wishlist", wishlistRoute);
router.use("/shops", shopRoute);
router.use("/auth", authRoute);
// route for test
router.use("/test", testRoute);

export default router;
