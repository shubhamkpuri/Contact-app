const express = require("express"), //provides ease of server establisment and many more.
    bodyParser = require("body-parser"), //to store form submission values
    mongoose = require("mongoose"), //to simplify the mongoDB
    app = express(),
    socketio = require('socket.io'); //for live error handling and dilvery reports
    require('dotenv/config'); //for dev use and hidding sid and tokken keys.



const Contact =require('./models/contacts.js'),
      Message =require('./models/messages.js');
const contactRoutes = require("./routes/contacts"),
     sentMessagesRoutes = require("./routes/sentMessages");
global.isVerified = 0; //0 for unverified 1 for verified and 2 for Guest

// to connect mongoDB hosted on mlab
 mongoose.connect(process.env.MLAB_SID, {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/kisan-project", {useNewUrlParser: true}); //local mongoDB

// App config or middlewears
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Routes
app.use(contactRoutes);
app.use(sentMessagesRoutes);







// Routes
// index route, have all the Contact list and add contact option.
app.get("/", (req, res) => {

    // find all contacts and sort according to the date they were created ascending
    if(isVerified ==1 || isVerified==2){
        if(isVerified==2){
            setTimeout(()=>{
                io.emit('guestLogin','index');
            },300);
        }
        Contact.find().sort({"createdAt": -1}).exec((err, contacts) => {
            if (err) {
                io.emit('error', err);
            } else {
                res.render("index", {contacts: contacts});
            }
        })

    }
    else{
        res.redirect("login");
    }


})
app.get('/login',(req,res) =>{
        res.render("login");
});
app.post('/login',(req,res) =>{
        if(req.body.loginName == process.env.LOGIN_NAME && req.body.loginPass == process.env.LOGIN_PASS){
            isVerified = 1;
            res.redirect("/");
        }
        if(req.body.loginName == 'guest' && req.body.loginPass == 'guest'){
            console.log('Guest');
            isVerified = 2;
            res.redirect("/");
        }

})

const port = process.env.PORT || 3200;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

global.io = socketio(server); //socketio to send informtion from server to client without request.


io.on('connection', () => {

    console.log('Connected');
    io.on('disconnected', () => {
        console.log("disconnected");
    })
})
