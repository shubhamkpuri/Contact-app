const express = require("express"),
      Contact =require('../models/contacts.js'),
      Message =require('../models/messages.js'),
      router = express.Router(),
      //initialisation of twilio its sid and token are stored in .env file as environment varia.
      client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);






// to create contact
router.post("/contacts", (req, res) => {
    if(isVerified ==1 ){
        Contact.create(req.body.contact, (err, newContact) => {
            if (err) {
                io.emit('error', err);
            } else {
                res.redirect("/");
            }
        })

    }
    else{
        res.redirect("login");
    }

})
// to show a particular contact info
router.get("/contacts/:id", (req, res) => {
    if(isVerified ==1 || isVerified==2){
        Contact.findById(req.params.id, (err, foundContact) => {
            if (err) {
                io.emit('error', err);
            } else {
                res.render("contactInfo", {contact: foundContact});
            }
        })

    }
    else{
        res.redirect("login");
    }


})
// to compose a OTP message to a particular contact and show form
router.get("/contacts/:id/compose", (req, res) => {
    if(isVerified ==1 || isVerified==2){
        if(isVerified==2){
            setTimeout(()=>{
                // console.log('compose');
                io.emit('guestLogin','compose');
            },500);
        }
        Contact.findById(req.params.id, (err, foundContact) => {
            if (err) {
                io.emit('error', err);
            } else {
                res.render("compose", {contact: foundContact});
            }
        })

    }
    else{
        res.redirect("login");
    }

})
// to send  OTP messages using twilio to a particular contact
router.post("/contacts/:id/compose", (req, res) => {

    if(isVerified ==1 ){
        const contactNumber = req.body.number, //retreiving contact number
              messageBody = req.body.text; //retreiving text for the message

        client.messages.create({
            to: contactNumber, //'+918285277364',
            from: '+12542554468',
            body: messageBody
        }, (err, data) => {
            if (err) {
                console.log(err);
                 io.emit('sendingError', err); //Error Due not verified number or incorrect contact number
            } else {
                responseData = {
                    twilio_id:data.sid,
                    message: data.body,
                    status: data.status,
                    to: data.to,
                    name:req.body.name
                }
                // Creating Sent messages details
                Message.create(responseData, (err, newMessage) => {
                    if (err) {
                        console.log("Error");
                        io.emit('error', err);
                    } else {
                        io.emit('smsStatus', responseData); //using socket to give response from server without request from client
                        res.redirect("/");
                    }
                })
            }
        })

    }
    else{
        res.redirect("login");
    }


});

module.exports = router;
