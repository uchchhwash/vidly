const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Customer, validate, validatePatch } = require("../models/customer")
const express = require("express");
const router = express.Router();

router.get("/", auth, async(req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
})

.post("/", auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
        email: req.body.email
    })

    customer = await customer.save();
    res.send(customer);
})

.put("/:id", auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    });

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send(customer);
})

.patch("/:id", auth, async(req, res) => {
    const { error } = validatePatch(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    });

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send(customer);
})

.delete("/:id", [auth, admin], async(req, res) => {
    console.log(req.param.id)
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send({
        id: customer._id,
        deleted: true
    });
})

.get("/:id", async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    res.send(customer);
});


module.exports = router;