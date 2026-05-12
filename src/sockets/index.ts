import ChatRoom from "../modules/main/chats/chat.schema.js";
import Message from "../modules/main/messages/message.schema.js";
import { Server, Socket } from "socket.io";

const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("send_message", async (data) => {
      try {
        const room = await ChatRoom.findById(data.roomId);
        if (!room) return;

        const message = await Message.create(data);

        io.to(data.roomId).emit("receive_message", message);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};

export default socketHandler;
