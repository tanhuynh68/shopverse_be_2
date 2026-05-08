import Message, { MESSAGE_TYPE } from "./message.schema.js";

export const createMessageMediaService = async (
  roomId: string,
  sender: string,
  type: string,
  mediaUrl: string,
) => {
  const message = await Message.create({
    roomId,
    sender,
    type,
    mediaUrl,
    message: "",
  });
  return message;
};

export const createTextMessageService =async(roomId: string, message: string, sender: string)=>{
  const textMessage = Message.create({message, roomId, type: MESSAGE_TYPE.TEXT, sender})
  return textMessage;
}

export const getMessagesService =async(roomId: string, currentUser: string)=>{
  const messages = await Message.find({roomId}).lean();
  const formattedMessages = messages.map((message)=>{
    return {
      ...message, isMe: message.sender.toString() === currentUser ? true : false
    }
  })
  return formattedMessages;
}
