const { isEmail, isMobilePhone } = require("validator")
const Joi = require('joi');
const mongoose = require("mongoose") //.set("debug", true);

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
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
})

const Customer = new mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(11).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required()
    };
    return Joi.validate(customer, schema);
}

function validateCustomerPatchReqest(customer) {
    const schema = {
        name: Joi.string().min(5),
        isGold: Joi.boolean(),
        phone: Joi.string().min(11),
        email: Joi.string().email({ minDomainAtoms: 2 })
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.validatePatch = validateCustomerPatchReqest;