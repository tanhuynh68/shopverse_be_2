import { io } from "socket.io-client";

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log("Client1 connected:", socket.id);
  socket.emit("join_room", "69fc214e0132dc7bf66b2765");

  setTimeout(() => {
    socket.emit("send_message", {
      roomId: "69fc214e0132dc7bf66b2765",
      senderId: "6891a115a7310f14a1f70ae3",
      text: "Hello từ client1"
    }, console.log('ok')
  );
  }, 5000);
});

socket.on("receive_message", (msg) => {
  console.log("Client1 nhận:", msg);
});