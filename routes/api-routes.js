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
            id: request.user.id,
            username: request.user.username
            
          });
       
     
    })

    //This endpoint should be changed to something more semantic like /api/isLoggedIn
    app.put("/api/validate", function(request, response) {
        // ("logging the data sent in with the put request")
        // (request.body.userEmail)
        // (request.body.isLoggedIn)

        db.Current_user.update({isLoggedIn: request.body.isLoggedIn}, {where: {email: request.body.userEmail}}).then(result => {
            // ("this is the response returned from the update event")
            // (result)
            response.json(result)
        }).catch(err => {
            // ("this is the error returned from the update event")
            // (err)
            response.status(404).send(err)
        })
            // ("the update to login values was made successfully")
        
    });





    app.post("/api/register",function(request,response){

        //have some functionality where if the user is already registered and he tries to register again, he will be told to log in.
        // ("Email and password sent from the post request are the following: ")
        // (request.body.email)
        // (request.body.username)
        // (request.body.password)


        db.User.create({
            email: request.body.email,
            username: request.body.username,
            password: request.body.password
        }).then((result)=>{

            response.json(result)

            db.Current_user.create({
                email: request.body.email,
                username: request.body.username,
                password: request.body.password

            }).then((result)=>{

                //response.json(result)\
                response.end()

            }).catch(err=>{
                response.status(404).send(err)
            })

            

        }).catch(err=>{

            response.status(404).send(err)
        });


    });

    /*
    app.post("/api/currentUser",function(request,response){

        //have some functionality where if the user is already registered and he tries to register again, he will be told to log in.
        // ("Email sent from the post request is the following: ")
        // (request.body.email)
       


        db.Current_user.create({
            email: request.body.email,
            includes: [db.User]
        }).then((result)=>{

            // ("A current user has been added to the Current_users table")
            // (result)
            response.end();

        }).catch(err=>{

            // ("Couldn't create an entry for a current user.")
            response.status(404).send(err)
        });


    });*/


    //When a socket gets created save it's Id. Send the id to the front end and render it as a user in the column to the left under "Users"
    
    app.put("/api/userbye", function(request, response) {
    
        // ("logging the data sent in with the put request")
        // (request.body.email)
        // (request.body.isLoggedIn)

        db.Current_user.update({isLoggedIn: request.body.isLoggedIn}, {where: {email: request.body.email}}).then(result => {
            // ("this is the response returned from the update event")
            // (result)
            // ("This is the email that was sent in with the body during the logout put request")
            // ( request.body.email)
            // (request.body.isLoggedIn)
            response.json(result)
        }).catch(err => {
            // ("this is the error returned from the update event")
            // (err)
        })
})
}
