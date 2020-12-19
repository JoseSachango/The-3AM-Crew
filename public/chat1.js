
//Function that runs as soon as the document is loaded. Similar to $(document).ready()
$(function(){

           


            var html = ``

            //a client side websocket connection is made
            const socket = io();
            
            //when the socket connection on this client recieves message titled "message" from the server it passes the message to a callback function and console.logs it to the browser
            socket.on("message", message=>{

                



                var recievedMessage = `
            
                <div class="row chatMessages">
    
                    <div class="col-6">
                        <div class="d-block bg-warning border rounded  mt-3 ">
                            <p class="p-3 text-white">${message}</p>
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


            $("#sendButton").on("click",function(event){

                console.log("The send button was clicked")

                var userMessage = $("#chatMessage").val().trim()

                socket.emit("MessageFromTheClient",userMessage)

                console.log("The message in the text area was: ");
                console.log(userMessage);

                var sentMessage = `
            
                <div class="row">
    
                                <div class="col-6">
                                
                                </div>
    
                                <div class="col-6">
                                    <div class="d-block bg-warning border rounded  mt-3 ">
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













})




//socket.emit("UserOnline", variable)