const mongoose = require("mongoose"); //to simplify the mongoDB


// Sent OTP messages Schema
var messageSchema = new mongoose.Schema({
    twilio_id:String,
    name:String,
    message: String,
    status: String,
    to: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;
