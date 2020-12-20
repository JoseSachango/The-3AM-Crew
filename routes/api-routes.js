const db = require("../models");

const passport = require("../config/passport");
//const { response } = require("express");



module.exports = function(app){

        // Using the passport.authenticate middleware with our local strategy.
        // If the user has valid login credentials, send them to the chat page.
        // Otherwise the user will be sent an error
    app.post("/api/login",passport.authenticate("local"),function(request,response){
//

        //How do you send a err using the .status() method on response? -> response.status(401).json(err);
        // err is whatever object represents what went wrong
    
        
        
        response.json({
            email: request.user.email, 
            id: request.user.id
          });
       
     
    })

    app.put("/api/validate", function(request, response) {
        console.log("logging the data sent in with the put request")
        console.log(request.body.userEmail)
        console.log(request.body.isLoggedIn)

        db.User.update({isLoggedIn: request.body.isLoggedIn}, {where: {email: request.body.userEmail}}).then(result => {
            console.log("this is the response returned from the update event")
            console.log(result)
        }).catch(err => {
            console.log("this is the error returned from the update event")
            console.log(err)
        })
    console.log("the update to login values was made successfully")
        
    })

    app.post("/api/register",function(request,response){

        //have some functionality where if the user is already registered and he tries to register again, he will be told to log in.
        console.log("Email and password sent from the post request are the following: ")
        console.log(request.body.email)
        console.log(request.body.username)
        console.log(request.body.password)


        db.User.create({
            email: request.body.email,
            username: request.body.username,
            password: request.body.password
        }).then(()=>{

            response.end();

        }).catch(err=>{

            response.status(404).send(err)
        });


    });


    app.post("/api/currentUser",function(request,response){

        //have some functionality where if the user is already registered and he tries to register again, he will be told to log in.
        console.log("Email sent from the post request is the following: ")
        console.log(request.body.email)
       


        db.Current_user.create({
            email: request.body.email,
            includes: [db.User]
        }).then((result)=>{

            console.log("A current user has been added to the Current_users table")
            console.log(result)
            response.end();

        }).catch(err=>{

            console.log("Couldn't create an entry for a current user.")
            response.status(404).send(err)
        });


    });


    //When a socket gets created save it's Id. Send the id to the front end and render it as a user in the column to the left under "Users"
    
    app.put("/api/userbye", function(request, response) {
    
        console.log("logging the data sent in with the put request")
        console.log(request.body.email)
        console.log(request.body.isLoggedIn)
        db.User.update({isLoggedIn: request.body.isLoggedIn}, {where: {email: request.body.email}}).then(result => {
            console.log("this is the response returned from the update event")
            console.log(result)
            response.end()
        }).catch(err => {
            console.log("this is the error returned from the update event")
            console.log(err)
        })
})
}
