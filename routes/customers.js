const bcrypt = require("bcryptjs");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Customer, CustomerCredentials, validate, validateRequest } = require("../models/customer")
const { Rental } = require("../models/rental")
const express = require("express");
const router = express.Router();

//get all customers
router.get("/", auth, async(req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
})

//create a new customer
.post("/signup", async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new CustomerCredentials({
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(req.body.password, salt);

    customer = await customer.save();

    let customerInfo = new Customer({
        _id: customer._id,
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    })

    customerInfo = await customerInfo.save();

    const token = customer.generateAuthToken();
    res.header("x-auth-token", token).send(customerInfo);

})

//get all rentals of the authenticated customer
.get("/rentals", auth, async(req, res) => {
    console.log(req.user)
    console.log("called")
    const rental = await Rental.find({ "customer._id": req.user });
    res.status(200).send(rental);
})

.patch("/change-password", auth, async(req, res) => {
    if (!req.body.password) return res.status(400).send("Provide A Password");
    console.log(req.user)
    const customer = await CustomerCredentials.findById(req.user._id)

    const validPassword = await bcrypt.compare(req.body.oldPassword, customer.password)
    if (!validPassword) return res.status(400).send("Invalid Old Password");

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(req.body.password, salt);
    await customer.save();
    res.status(200).send("Password Changed Successful");
})

//update a customer information
.put("/:id", auth, async(req, res) => {
    const { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    });

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send(customer);
})

//update a specific information of a customer
.patch("/:id", auth, async(req, res) => {
    const { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    });

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send(customer);
})

//remove a customer
.delete("/:id", [auth, admin], async(req, res) => {
    console.log(req.param.id)
    const customer = await Customer.findByIdAndRemove(req.params.id);
    await CustomerCredentials.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send({
        id: customer._id,
        deleted: true
    });
})

//get a customer by id
.get("/:id", auth, async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send(customer);
})


module.exports = router;