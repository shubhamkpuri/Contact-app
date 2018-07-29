const express = require("express"),
      Contact =require('../models/contacts.js'),
      Message =require('../models/messages.js'),
      router = express.Router(),
      //initialisation of twilio its sid and token are stored in .env file as environment varia.
      client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);



router.get('/sentMessages', (req, res) => {

    if(isVerified==1 || isVerified==2){
        updateStatus(); // function checks for current status of all the text msgs sent
        Message.find().sort({"createdAt": -1}).exec( (err, messages) => {
            if (err) {
                console.log(err);
                io.emit('error', err); //using socket to give response from server without request from client
            } else {
                res.render("sentMessages", {
                    messages: messages
                });
            }
        })
    }else{
        res.redirect("login");
    }


})
// function checks for current status of all the text msgs sent
function updateStatus(){
    var message1= client.messages; //retrieving msgs from twilio
    Message.find((err, messages) => { //retreiving sent msgs from DB
        if (err) {
            console.log(err);
            io.emit('error', err);
        } else {
            messages.forEach(Dbmessage =>{
                if(Dbmessage.status !='delivered'){
                    message1.each((message2) => {
                        if(message2.sid == Dbmessage.twilio_id && message2.status != Dbmessage.status){ //Checking if the status of both from DB and twilio differs
                        Dbmessage.status =    message2.status; //updating the status of DB msgs from twilio msgs.
                            Message.findByIdAndUpdate(Dbmessage.id,Dbmessage, (err, foundContact) => { //then finally saving the new updated data in DB
                                if (err) {
                                    io.emit('error', err);
                                } else {
                                    console.log("updated");
                                    // res.render("sendMessage", {contact: foundContact});
                                }
                            })
                        }
                    });
                }
            })
        }
    })
}
module.exports = router;
