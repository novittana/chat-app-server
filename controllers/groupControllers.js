const {Group} = require("../models/group");
const {Contact} = require("../models/contact");
const {Conversation} = require("../models/Conversation");


module.exports.addGroup = async (req, res, next) => {
    try {

        const newGroup = await Group.create({
            name: req.body.name,
            admin: req.body.admin,
            members:req.body.members,
            filter:req.body.filter
        });
        res.status(201).json(newGroup);
    } catch (ex) {
        next(ex);
    }
};

module.exports.getGroups = async (req, res, next) => {
    try {

        const groups = await Group.find({
           members: {$in:[req.params.userId]}
        });
        res.status(200).json(groups);
    } catch (ex) {
        res.status(500).json(err);
    }
};
