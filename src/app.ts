import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import connectDB from "./config/db.config.js";
import env from "./config/env.config.js";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to ShopVerse_BE_2");
});

app.use("/api/v1", router);

app.get("/test-500", async (req, res, next) => {
  try {
    throw new Error("Async error");
  } catch (error) {
    next(error);
  }
});

// 404
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    message: "Not found",
    status_code: 404
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
    status_code: 500
  });
});

const PORT = env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

connectDB();