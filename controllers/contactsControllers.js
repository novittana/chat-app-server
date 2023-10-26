const {Contact} = require("../models/contact");


module.exports.addContact = async (req, res, next) => {
    try {
        const newContact = req.body;
        const result = await Contact.create({
            ...newContact,
        });
        res.status(201).json(result);
    } catch (ex) {
        next(ex);
    }
};

module.exports.getAllContacts = async (req, res, next) => {
    try {
        const {owner} = req.query;
        const contacts = await Contact.find({owner});
        res.json(contacts);
    } catch (ex) {
        next(ex);
    }
}

// module.exports.deleteContact = async (req, res, next) => {
//     try {
//
//     } catch (ex) {
//         next(ex)
//     }
// }