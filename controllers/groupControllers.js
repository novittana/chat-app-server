const {Group} = require("../models/group");


module.exports.addGroup = async (req, res, next) => {
    try {
        const newGroup = req.body;
        const result = await Group.create({
            ...newGroup,
        });
        res.status(201).json(result);
    } catch (ex) {
        next(ex);
    }
};