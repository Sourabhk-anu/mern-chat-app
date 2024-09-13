const express = require('express');
const chatRouter = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup} = require('../controllers/chatController')

chatRouter.post("/", protect, accessChat);
chatRouter.get("/", protect, fetchChats);
chatRouter.post("/group", protect, createGroupChat);
chatRouter.put("/rename", protect, renameGroup);
chatRouter.put("/groupremove", protect, removeFromGroup);
chatRouter.put("/groupadd", protect, addToGroup);

module.exports = chatRouter