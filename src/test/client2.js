import { io } from "socket.io-client";

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log("Client2 connected:", socket.id);

 const connect = socket.emit("join_room", "69fc214e0132dc7bf66b2765");
});

socket.on("receive_message", (msg) => {
  console.log("Client2 nhận:", msg);
});