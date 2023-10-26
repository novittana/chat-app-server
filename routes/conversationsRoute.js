const {addConversation, getConversations} = require("../controllers/conversationContoller");
const router = require("express").Router();

router.post("/", addConversation);
router.get("/:userId", getConversations)



module.exports = router;