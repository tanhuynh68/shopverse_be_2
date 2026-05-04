import ChatRoom from "./chat.schema.js";

export const createChatRoomService = async (
  customerId: string,
  shopId: string,
) => {
    
  const room = await ChatRoom.findOneAndUpdate(
    { customerId, shopId },
    {},
    { upsert: true, new: true },
  );

  return room;
};
