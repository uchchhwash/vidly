const config = require("config");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator")
const Joi = require("joi");
const mongoose = require("mongoose") //.set("debug", true);

const userSchema = new mongoose.Schema({
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
    }
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
}

const User = new mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;