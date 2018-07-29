const mongoose = require("mongoose");//to simplify the mongoDB

// Contact Schema
var contactSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    number: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Contact = mongoose.model("Contact", contactSchema);
module.exports =Contact;
