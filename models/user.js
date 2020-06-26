const { isEmail } = require("validator")
const Joi = require("joi");
const mongoose = require("mongoose") //.set("debug", true);

const User = new mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return isEmail(value);
            },
            message: "Invalid Email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    }
}));

function validateUser(genre) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string.min(8).max(50).required()
    };

    return Joi.validate(genre, schema);
}

exports.User = User;
exports.validate = validateUser;