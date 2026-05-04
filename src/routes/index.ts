
import express from 'express'
import roomRoute from '../modules/chat/chat.routes.js';

const router =express.Router();

router.use('/rooms', roomRoute)

export default router;