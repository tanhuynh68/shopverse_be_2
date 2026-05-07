import { request, response, Router } from "express";
import express from 'express'
import connectDB from "./config/db.config.js";
import env from './config/env.config.js'
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
//
app.listen(env.PORT || 7000, ()=>{
    console.log(`Server running at http://localhost:${env.PORT}`)
})
// connect to mongo db
connectDB();