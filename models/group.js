const {Schema, model} = require('mongoose');
const {handleMongooseError} = require("../helpers");
const mongoose = require("mongoose");

const groupSchema = new Schema({
        name:
            {type: String},
        members:
            {type: Array},
        filter:
            {type: String},
        admin:
            {type: String}
    },
    {timestamps: true}
);


groupSchema.post("save", handleMongooseError);

const Group = model("Group", groupSchema);
module.exports = {Group};