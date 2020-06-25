const { isEmail, isMobilePhone } = require("validator")
const Joi = require('joi');
const mongoose = require("mongoose") //.set("debug", true);
const express = require('express');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: Boolean || false,
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


module.exports = router;