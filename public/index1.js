$(function () {


    $("#loginForm").on("submit", function (event) {

        event.preventDefault()

        var loginEmail = $("#loginEmail").val().trim()
        var loginPassword = $("#loginPassword").val().trim()
     

        localStorage.clear();
      

        // (loginEmail)
        // (loginPassword)

        var loginCredentials = {
            email: loginEmail,
            password: loginPassword
        }

        if (!loginCredentials.email || !loginCredentials.password) {
            return;
        }

        $.ajax("/api/login", {

            type: "POST",
            data: loginCredentials //this data is stored in request.body.*Object key(Object=loginCredentials)*

        }).then((result) => {
            var newObj = { isLoggedIn: 1, userEmail: result.email }

            //---------------------------------
            $.ajax("/api/validate", {
                type: "PUT",
                data: newObj
            }).then((results2) => {
                // ("ajax call was made successfully")
                // (results2)
            }).catch(err => {
                // (err)
            })
            //------------------------------

            // ("This is the result we got from our database: ")
            // (result)

            localStorage.setItem("username",result.username)
            localStorage.setItem("id",result.id)
            localStorage.setItem("loginEmail",result.email)



            //if the user is successfully authenticated then make a post request to the /api/currentUser
            //endpoint and use sequelize .create() method to add the users information to the table.
            /*
            var currentUserObject = {
                email: loginEmail
            };

            $.ajax("/api/currentUser",{
                type:"POST",
                data: currentUserObject
            }).then((result2)=>{

                //switching to the chat window if the response comes back with no errors
                // ("A current user has been added to the Current_users table")
                window.location.replace("/chat");

            }).catch(err=>{
                // ("An error was caught trying to create an entry in the current users table.")
                // (err)
            })*/


            //switching to the chat window if the response comes back with no errors
            window.location.replace("/chat");

        }).catch((err) => {

            // ("This is the err we got from our post attempt: ")
            // (err)

            //Alert that tells users to register because they're not in the database
            alert("You don't currently have an account. Please register to continue using Lexi")
        });

        //sends an object containing login email and password from this socket. The event has the name loginCredentials. The server should listen for this name.
        //socket.emit("loginCredentials", loginCredentials)

        $("#loginEmail").val("")
        $("#loginPassword").val("")

    })




    $("#registerForm").on("submit", function (event) {

        event.preventDefault();



        var registerEmail = $("#registerEmail").val().trim()
        var registerUserName = $("#registerUserName").val().trim()
        var registerPassword = $("#registerPassword").val().trim()

        // (registerEmail)
        // (registerUserName)
        // (registerPassword)

        //have to delete username functionality because it's not compatible with passport
        var registerCredentials = {
            email: registerEmail,
            username: registerUserName,
            password: registerPassword
        }

        //!registerCredentials.username ||
        if (!registerCredentials.email || !registerCredentials.username || !registerCredentials.password) {
            return;
        }


        $.ajax("/api/register", {

            type: "POST",
            data: registerCredentials
        }).then((result) => {

            // ("This is the result I get back after I register: ")
            // (result)

            localStorage.setItem("username",result.username)
            localStorage.setItem("id",result.id)
            localStorage.setItem("loginEmail",result.email)


            var newObj = { isLoggedIn: 1, userEmail: result.email }

            //---------------------------------
            $.ajax("/api/validate", {
                type: "PUT",
                data: newObj
            }).then((results2) => {
                // ("ajax call was made successfully")
                // (results2)
            }).catch(err => {
                // (err)
            })
            //------------------------------



            window.location.replace("/chat");

        }).catch((err) => {

            // (err)


        })


    })

















})