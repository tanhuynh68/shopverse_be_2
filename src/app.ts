import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.config.js";
import env from "./config/env.config.js";
import router from "./routes/index.js";

const app = express();
const PORT = env.PORT || 9000;

// HTTP SERVER + SOCKET.IO
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket connection
io.on("connection", (socket) => {
  console.log("✅ connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ disconnected:", socket.id);
  });

  // test event
  socket.on("ping", () => {
    socket.emit("pong", "pong from server");
  });
});

// make io accessible in routes if needed
app.set("io", io);

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to ShopVerse_BE_2");
});

app.use("/api/v1", router);

// test error
app.get("/test-500", async (req, res, next) => {
  try {
    throw new Error("Async error");
  } catch (error) {
    next(error);
  }
});

// 404 HANDLER
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    message: "Not found",
    status_code: 404,
  });
});

// ERROR HANDLER
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error:", err.message);
  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
    status_code: 500,
  });
});

// START SERVER
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// CONNECT DB
connectDB();