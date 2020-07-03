const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Customer } = require("./customer");
const { User } = require("./user");

const supportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },

    title: {
        type: String,

        required: true
    },
    message: {
        type: String,

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