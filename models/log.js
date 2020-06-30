const mongoose = require("mongoose") //.set("debug", true);

const logSchema = new mongoose.Schema({
    timestamp: Date,
    level: String,
    message: String,
    meta: {
        type: new mongoose.Schema({
            message: String,
            name: String,
            stack: String
        })
    }

})

const Log = new mongoose.model("Log", logSchema);

exports.Log = Log;