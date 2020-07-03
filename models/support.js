const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Customer } = require("./customer");
const { User } = require("./user");

const supportSchema = new mongoose.Schema({
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

supportSchema.methods.isUser = function(user) {
    if (!user) {
        this.user._id = new mongoose.Types.ObjectId,
            this.user.userType = "Anonymous"
    } else {
        this.user._id = user;
        let check = Customer.findById(user);
        if (check) {
            this.user.userType = "Customer";
        } else {
            let check = User.findById(user);
            if (check) {
                this.user.userType = "Customer";
            }
        }
    }
}
const Support = new mongoose.model("Support", supportSchema);

const test = new Support()
console.log(test)

exports.Support = Support;