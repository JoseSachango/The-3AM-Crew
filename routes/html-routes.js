const db = require("../models");





module.exports = function(app){

    app.get("/",function(request,response){

        response.render("index")
    });



    app.get("/chat",function(request,response){

        //This part of the code should find all users in the current user table. Create a seperate table for this
        db.Current_user.findAll({

        }).then(dbData=>{

            console.log("This is the data that was returned by the findAll query: ")
            console.log(dbData)

            console.log("More specific data: ")
            console.log(dbData[0].dataValues.id)

            var hbsObject = {
                User: dbData
            }

            response.render("chat",hbsObject)
        }).catch(err=>{
            
            //added this error handling to see if it fixed a problem with the login page
            response.status(404).send(err)
        })
        
    });

}