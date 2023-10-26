const {addMessage, getMessages} = require("../controllers/messagesController");
const router = require("express").Router();
//
router.post("/", addMessage);
router.get("/:conversationId", getMessages);
//
//
module.exports = router;