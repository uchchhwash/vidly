const { isEmail, isMobilePhone } = require("validator")
const Joi = require("joi");
const mongoose = require("mongoose");


const Rental = new mongoose.model("Rental", new mongoose.Schema({
    //customer information part
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                validate: {
                    validator: function(value) {
                        return isMobilePhone(value, "bn-BD")
                    },
                    message: "Invalid Mobile Number"
                }
            },
            email: {
                type: String,
                required: true,
                validate: {
                    validator: function(value) {
                        return isEmail(value);
                    },
                    message: "Invalid Email"
                }
            }
        }),
        required: true
    },

}))