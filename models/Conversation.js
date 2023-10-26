const {Schema, model} = require('mongoose');
const {handleMongooseError} = require("../helpers");
const mongoose = require("mongoose");

const conversationSchema = new Schema({
        members:
            {type: Array},
        filter:
            {type: String}
    },
    {timestamps: true}
);


conversationSchema.post("save", handleMongooseError);

const Conversation = model("Conversation", conversationSchema);
module.exports = {Conversation};