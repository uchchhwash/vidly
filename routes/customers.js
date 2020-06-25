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

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
});

router.post('/', async(req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
        email: req.body.email
    })

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async(req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.patch('/:id', async(req, res) => {
    const { error } = validateCustomerPatchReqest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});


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
module.exports = router;