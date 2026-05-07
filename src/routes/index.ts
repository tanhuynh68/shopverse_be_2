
import express from 'express'
import roomRoute from '../modules/chats/chat.routes.js';
import messageRoute from '../modules/messages/message.route.js';

const router =express.Router();

router.use('/rooms', roomRoute)
router.use('/messages', messageRoute)

export default router;