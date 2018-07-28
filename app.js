const express = require("express"), //provides ease of server establisment and many more.
    bodyParser = require("body-parser"), //to store form submission values
    mongoose = require("mongoose"), //to simplify the mongoDB
    app = express(),
    socketio = require('socket.io'); //for live error handling and dilvery reports
    require('dotenv/config'); //for dev use and hidding sid and tokken keys.

//initialisation of twilio its sid and token are stored in .env file as environment varia.
const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// to connect mongoDB hosted on mlab
mongoose.connect(process.env.MLAB_SID, {useNewUrlParser: true});
//mongoose.connect("mongodb://localhost:27017/kisan-project", {useNewUrlParser: true}); //local mongoDB

// App config or middlewears
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

// Routes
// index route, have all the Contact list and add contact option.
app.get("/", (req, res) => {
    // find all contacts and sort according to the date they were created ascending
    Contact.find().sort({"createdAt": -1}).exec((err, contacts) => {
        if (err) {
            io.emit('error', err);
        } else {
            res.render("index", {contacts: contacts});
        }
    })

})
// to create contact
app.post("/contacts", (req, res) => {
    Contact.create(req.body.contact, (err, newContact) => {
        if (err) {
            io.emit('error', err);
        } else {
            res.redirect("/");
        }
    })
})
// to show a particular contact info
app.get("/contacts/:id", (req, res) => {
    Contact.findById(req.params.id, (err, foundContact) => {
        if (err) {
            io.emit('error', err);
        } else {
            res.render("contactInfo", {contact: foundContact});
        }
    })

})
// to compose a OTP message to a particular contact and show form
app.get("/contacts/:id/compose", (req, res) => {
    Contact.findById(req.params.id, (err, foundContact) => {
        if (err) {
            io.emit('error', err);
        } else {
            res.render("compose", {contact: foundContact});
        }
    })
})
// to send  OTP messages using twilio to a particular contact
app.post("/contacts/:id/compose", (req, res) => {
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
});

app.get('/sentMessages', (req, res) => {
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


const port = process.env.PORT || 3200;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = socketio(server); //socketio to send informtion from server to client without request.
io.on('connection', () => {
    console.log('Connected');
    io.on('disconnected', () => {
        console.log("disconnected");
    })
})
