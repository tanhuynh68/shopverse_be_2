import { ROOM_MESSAGES } from "./room.message.js";
import { SHOP_MESSAGES } from "./shop.message.js";
import { VALIDATE_MESSAGES } from "./validate.messages.js";
import { WISHLIST_MESSAGES } from "./wish-list.message.js";

export const MESSAGES = {
  ...ROOM_MESSAGES,
  ...WISHLIST_MESSAGES,
  ...SHOP_MESSAGES,
  ...VALIDATE_MESSAGES,
  // message
  CREATE_TEXT_MESSAGE_SUCCESSFULLY: "Create text message successfully!",
  CREATE_TEXT_MESSAGE_FAILED: "Create text message failed!",
  SEND_ORDER_MESSAGE_SUCCESSFULLY: "Send order message successfully!",
  SEND_ORDER_MESSAGE_FAILED: "Send order message failed!",
  SEND_PRODUCT_MESSAGE_SUCCESSFULLY: "Send product message successfully!",
  SEND_PRODUCT_MESSAGE_FAILED: "Send product message failed!",
  ORDER_NOT_FOUND: "Order not found!",
  PRODUCT_NOT_FOUND: "Product not found!",
  PRODUCT_IS_NOT_ACTIVE: "Product is not active!",
  PRODUCT_IS_DELETED: "Product is deleted!",
  PRODUCT_IS_NOT_YOURS: "Product is not yours!",
  PRODUCT_IS_NOT_BELONG_TO_SHOP: "Product is not belong to shop!",
};
