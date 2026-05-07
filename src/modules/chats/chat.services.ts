import ChatRoom from "./chat.schema.js";

export const createChatRoomService = async (
  firstUser: string,
  secondUser: string,
) => {
  const room = await ChatRoom.findOneAndUpdate(
    { firstUser, secondUser },
    {},
    { upsert: true, new: true },
  ).populate("firstUser secondUser", "_id name email role phone avatar");

  return {
    _id: room._id,
    createdAt: room.createdAt,
    lastMessage: room.lastMessage,
    updatedAt: room.createdAt,
    me: room.firstUser,
    partner: room.secondUser,
  };
};

export const customerGetRoomsService = async (userId: string, role: string) => {
  const rooms = await ChatRoom.find({
    // find user
    $or: [{ firstUser: userId }, { secondUser: userId }],
  }).populate("firstUser secondUser", "_id name email role phone avatar");

  const formattedRooms = rooms.map((room) => {
    const isMe = room.firstUser._id.toString() === userId;
    return {
      _id: room._id,
      createdAt: room.createdAt,
      lastMessage: room.lastMessage,
      updatedAt: room.createdAt,
      // objectId === userId
      me: isMe ? room.firstUser : room.secondUser,
      partner: isMe ? room.secondUser : room.firstUser,
    };
  });
  return formattedRooms;
};
