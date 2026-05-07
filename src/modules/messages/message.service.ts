import Message from "./message.schema.js";

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
