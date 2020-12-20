
//Function that runs as soon as the document is loaded. Similar to $(document).ready()
$(function () {

    // $("#logout").on("submit", function (event) {

    //     event.preventDefault()
    //     var loginEmail = $("#loginEmail").val().trim()
    //     $("#logout").on("click", function (event) {
    //     console.log("show if logout");

    //     })
        
    // });

    //adding this usersDisplay conditional statement so that we don't have issues with asynchronus behavior
    console.log($("#usersDisplay").html().includes("Users"))
    
    if($("#usersDisplay").html().includes("Users")){
     
            var html = ``

            var userHtml = $(".users").html()
            console.log(userHtml)

            console.log

            var emailTo;
            //a client side websocket connection is made
            const socket = io();

            //sending the email stored in localStorage to the server so we can render the users who are currently logged in
            socket.emit("email", localStorage.getItem("loginEmail"))

            //recieving the email the server sends back to so we can render the users who are currently logged in
            socket.on("emailSentByServer", message => {
                emailTo = message

                //userHtml += `<input class="btn btn-secondary w-75 mb-2" type="submit" value="${message}"></input>`

                //$(".users").html(userHtml)

                $(".users").append(`<input id="${message}" class="btn btn-secondary w-75 mb-2" type="submit" value="${message}"></input>`)


            })

            //when the socket connection on this client recieves message titled "message" from the server it passes the message to a callback function and console.logs it to the browser
            socket.on("message", message => {

                console.log("This is a message sent by another user: ")
                console.log(message)

              
                var recievedMessage = `
                
                    <div class="row chatMessages">
        
                        <div class="col-6">
                            <div class="d-block bg-warning border rounded  mt-3 ">
                                <h6 class="ml-2 mt-2">${message.userEmailKey}</h6>    
                                <p class="p-3 text-white">${message.userMessageKey}</p>
                            </div>
                        </div>
        
                        <div class="col-6">
                        
                        </div>
        
                    </div>
                    
                    
                    `

                html += recievedMessage

                $("#currentChat").html(html)

                console.log(message)


                $(".chatMessages").scrollTop()

            });
            //------------------------------------------------------------------------------------

            $("#sendButton").on("click", function (event) {

                console.log("The send button was clicked")

                //-----
                var userMessage = $("#chatMessage").val().trim()

                var userMessageObj = {
                    userMessageKey: userMessage,
                    userEmailKey: localStorage.getItem("loginEmail")
                }

                socket.emit("MessageFromTheClient", userMessageObj)

                console.log("The message in the text area was: ");
                console.log(userMessageObj);
                //-----

                var sentMessage = `
                
                    <div class="row">
        
                                    <div class="col-6">
                                    
                                    </div>
        
                                    <div class="col-6">
                                        <div class="d-block bg-warning border rounded  mt-3 ">
                                            <h6 class="ml-2 mt-2">${localStorage.getItem("loginEmail")}</h6>
                                            <p class="p-3 text-white">${userMessage}</p>
                                        </div>
                                    </div>
        
                    </div>
                    
                    `

                html += sentMessage

                $("#currentChat").html(html)

                $("#chatMessage").val("")

                $(".chatMessages").scrollTop()
            })
            //-------------------------------------------------------------------------------------------

            //When you click a user on the left column it activates a socket.emit("message","*chat room name*")
            //The server will be listening for all messages, but when the message is "Chatroomname *Name*" it
            //uses .split() to grab the *Name* from the string and creates a chat room with that name

            $(".usersActive").on("click", function (event) {

                var userId = event.target.gettAttribute("id")
                var chatName = `chatName&${userId}`

                socket.emit("MessageFromTheClient", chatName)
            })

        
            $("#logout").on("click", function (event) {
                var dataObj = {isLoggedIn: 0, email: localStorage.getItem("loginEmail")}
                $.ajax("/api/userbye", {
                    type: "PUT",
                    data: dataObj
                }).then((results2) => {
                    localStorage.clear();
                    console.log("ajax call was made successfully")
                    console.log(results2)
                    window.location.replace("/");
                }).catch(err => {
                    console.log(err)
                })
                

            })
            









        //})


}

})



