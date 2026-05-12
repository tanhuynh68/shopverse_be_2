import { MESSAGE_TYPE } from "../messages/message.schema.js";
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

export const updateLastMediaMessage = async(roomId: string, type: MESSAGE_TYPE)=>{
  await ChatRoom.findByIdAndUpdate(roomId, {lastMessage: type === MESSAGE_TYPE.IMAGE ? 'Image' : 'Video'});
  return true
}

export const getRoomById = async(roomId: string)=>{
 const room = await ChatRoom.findById(roomId);
  return room;
}

