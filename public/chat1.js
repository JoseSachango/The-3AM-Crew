
//Function that runs as soon as the document is loaded. Similar to $(document).ready()
$(function () {

    

    //adding this usersDisplay conditional statement so that we don't have issues with asynchronus behavior

    // ($("#usersDisplay").html())
   // // ($("#usersDisplay").html().includes("Users"))

    if ($("#usersDisplay").html()!=undefined) {

        var html = ``

        var userHtml = $(".users").html()
        // (userHtml)



        
        //a client side websocket connection is made
        const socket = io();

        //sending the email stored in localStorage to the server so we can render the users who are currently logged in
        socket.emit("username", localStorage.getItem("username"))

        //recieving the email the server sends back to so we can render the users who are currently logged in
        socket.on("usernameSentByServer",username => {
            

            //userHtml += `<input class="btn btn-secondary w-75 mb-2" type="submit" value="${message}"></input>`

            //$(".users").html(userHtml)
            // (" Does $('.users').html().includes(message)?: ")
            // ($(".users").html().includes(username))

            //constraint so that you don't see a double entry of a user in the user column
            if ($(".users").html().includes(username)) {
                // ("User already posted")
                return;
            } else {

                $(".users").append(`<input id="${username}" class="btn btn-secondary w-75 mb-2" type="submit" value="${username}"></input>`)
            }


        });

        /* --> This is a function we will use later to experiment with the automatic scroll of the page
        function scrollFunction(){

            window.scrollTo(0, document.querySelectorAll(".chatMessages")[document.querySelectorAll(".chatMessages").length-1].scrollBottom
            );

            // ("This is the value of line 93: ")
            // (document.querySelectorAll(".chatMessages")[document.querySelectorAll(".chatMessages").length-1])
        }*/

        //when the socket connection on this client recieves message titled "message" from the server it passes the message to a callback function and // s it to the browser
        socket.on("message", message => {

            // ("This is a message sent by another user: ")
            // (message)


            var recievedMessage = `
                
                    <div class="row chatMessages">
        
                        <div class="col-6">
                            <div class="d-block bg-warning border rounded  mt-3 ">
                                <h6 class="ml-2 mt-2">${message.usernameKey}</h6>    
                                <p class="p-3 text-white">${message.userMessageKey}</p>
                            </div>
                        </div>
        
                        <div class="col-6">
                        
                        </div>
        
                    </div>
                    
                    
                    `

            html += recievedMessage

            $("#currentChat").html(html)

            // (message)


          //scrollFunction()

        });
        //------------------------------------------------------------------------------------

        //$("#sendButton").on("click", function (event) {
        $("#chatForum").on("submit", function (event) {

            event.preventDefault();

            // ("The send button was clicked")

            
            var userMessage = $("#chatMessage").val().trim()

            var userMessageObj = {
                userMessageKey: userMessage,
                usernameKey: localStorage.getItem("username")
            }

            socket.emit("MessageFromTheClient", userMessageObj)

            // ("The message in the text area was: ");
            // (userMessageObj);
           

            var sentMessage = `
                
                    <div class="row">
        
                                    <div class="col-6">
                                    
                                    </div>
        
                                    <div class="col-6">
                                        <div class="d-block bg-warning border rounded  mt-3 ">
                                            <h6 class="ml-2 mt-2">${localStorage.getItem("username")}</h6>
                                            <p class="p-3 text-white">${userMessage}</p>
                                        </div>
                                    </div>
        
                    </div>
                    
                    `

            html += sentMessage

            $("#currentChat").html(html)

            $("#chatMessage").val("")

           //scrollFunction();

         
        });
        //-------------------------------------------------------------------------------------------

        //When you click a user on the left column it activates a socket.emit("message","*chat room name*")
        //The server will be listening for all messages, but when the message is "Chatroomname *Name*" it
        //uses .split() to grab the *Name* from the string and creates a chat room with that name

        /*
        $(".usersActive").on("click", function (event) {
            var userId = event.target.gettAttribute("id")
            var chatName = `chatName&${userId}`
            socket.emit("MessageFromTheClient", chatName)
        })*/


        $(".logout").on("click", function (event) {
            var dataObj = { isLoggedIn: 0, email: localStorage.getItem("loginEmail") }

            //make this endpoint more semantic
            $.ajax("/api/userbye", {
                type: "PUT",
                data: dataObj
            }).then((results2) => {

                // ("ajax call was made successfully")
                // (results2)

                //going to need to emit a socket message here that tells the server to remove the user that just logged out
                var user = localStorage.getItem("username");

               
                
                socket.emit("loggedOut", user);

                localStorage.clear();
                window.location.replace("/");
            }).catch(err => {
                // (err)
            })


        })


        $(".delete").on("click",function(event){

        })



        socket.on("loggedOutServerReturn", function (username) {
            // ("This is the element we want to remove: ")
            var element = $(`#${username}`).html()
            // (element)
            
            
            $(`#${username}`).remove()
        })










        //})


    }

})
