const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Customer } = require("./customer");
const { User } = require("./user");

const supportSchema = mongoose.Schema({
    user: {
        _id: mongoose.Types.ObjectId,
        userType: String
    },
    title: {
        type: String,
        minlength: 5,
        required: true
    },
    message: {
        type: String,
        minlength: 5,
        required: true
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

const Support = new mongoose.model("Support", supportSchema);

exports.Support = Support;