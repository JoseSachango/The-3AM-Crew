//require in express 
var express = require("express");

var path = require("path")

//create an instance of the express server called app
var app = express();

const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");


const db = require("./models");

//requiring http to work with socket.io
var http = require("http");
// requiring socket.io
var socketio = require("socket.io");

//creating a server using http
const server = http.createServer(app);
//initialize the io variable
const io = socketio(server);


//middleware for static files in the public folder
app.use(express.static("public"));



//create a port to listen for request on
var PORT = process.env.PORT || 3012;


//middleware that allows us to use request.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// We need to use sessions to keep track of our user's login status (middleware that allows us to use request.user)
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    // Set Handlebars.
    var exphbs = require("express-handlebars");
    
    app.engine("handlebars", exphbs({ defaultLayout: "main" }));
    app.set("view engine", "handlebars");
    
    
    //calling functions for routes (controllers)
    require("./routes/html-routes.js")(app)
    require("./routes/api-routes.js")(app)
    



    // Run when a client connects using the command -> var socketio = io();
    // the argument socket is the particular client that connected.
    io.on("connection",(socket)=>{
    
        console.log("The server has registered a socket connection")
    
        //when a user connects broadcast it only to the user
        socket.emit("message","Welcome to Lexi")
    
        //when a user connects broadcast it to everyone but the user
        socket.broadcast.emit("message","A user has joined the chat")
    
        //when a user disconnects
        socket.on("disconnect",()=>{
            io.emit("message","A user has left the chat")
        })

        //when the server recieves an emitter with the name "MessageFromTheClient" it broadcasts the message to everyone but the current client.
        socket.on("MessageFromTheClient",function(userMessage){

            console.log("This is the userMessage that's passed in as an argument to the socket.on listener: ")
            console.log(userMessage)
            socket.broadcast.emit("message",userMessage)
        })
    
    })









db.sequelize.sync().then(()=>{

    server.listen(PORT,function(){
        console.log("Server up and running. Listening on  http://localhost:"+PORT)
    });

});

