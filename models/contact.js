const {Schema, model} = require('mongoose');
const Joi = require('joi');

const {handleMongooseError} = require('../helpers');
const mongoose = require("mongoose");

const contactSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
    {timestamps: true,});

const Contact = model("Contact", contactSchema);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
});

module.exports = {Contact,

addSchema}