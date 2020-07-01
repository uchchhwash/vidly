const { isEmail, isMobilePhone } = require("validator")
const Joi = require("joi");
const mongoose = require("mongoose") //.set("debug", true);

const customerCredentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
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

const CustomerCredentials = new mongoose.model("CustomerCredentials", customerCredentialsSchema);

function validateCustomer(customer) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(8).max(50).required(),
    };
    return Joi.validate(customer, schema);
}


exports.CustomerCredentials = CustomerCredentials;
exports.validateSignUp = validateCustomer;