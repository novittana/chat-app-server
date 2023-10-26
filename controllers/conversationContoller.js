const {Conversation} = require("../models/Conversation");

//new conv

module.exports.addConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({
            members: [req.body.senderId, req.body.receiverId], filter:"private"
        });
        res.status(201).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.getConversations = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]}
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
}