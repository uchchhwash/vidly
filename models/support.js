const mongoose = require("mongoose");
const { isEmail } = require("validator")
const supportSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required
    },
    message: {
        type: String,
        minlength: 5,
        required
    },
    email: {
        type: String,
        validate: {
            validator: function(value) {
                return isEmail(value);
            }
        },
    }
})