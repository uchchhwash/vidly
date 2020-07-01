const { isEmail, isMobilePhone } = require("validator")
const Joi = require("joi");
const mongoose = require("mongoose") //.set("debug", true);

const customerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
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
    }
})

const Customer = new mongoose.model("Customer", customerSchema);

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

const CustomerCredentials = new mongoose.model("CustomerCredential", customerCredentialsSchema);


function validateCustomer(customer) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(8).max(50).required(),
        name: Joi.string().min(5).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(11).required(),
    };
    return Joi.validate(customer, schema);
}

function validateCustomerPatchReqest(customer) {
    const schema = {
        name: Joi.string().min(5),
        isGold: Joi.boolean(),
        phone: Joi.string().min(11),
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.CustomerCredentials = CustomerCredentials;
exports.validate = validateCustomer;
exports.validatePatch = validateCustomerPatchReqest;