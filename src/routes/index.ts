
import express from 'express'
import roomRoute from '../modules/chats/chat.routes.js';

const router =express.Router();

router.use('/rooms', roomRoute)

export default router;