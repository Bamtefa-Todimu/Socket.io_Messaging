import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";



const urlParam  = new URLSearchParams(window.location.search)
const params  = urlParam.get('username');
const profilePicture  = urlParam.get('profilepic');
console.log(params);
console.log(profilePicture);
var onlineUsersArea = []
var currentUser
var selectedUser = "general" // changed 
var allMessages //changed


var userMessage = document.querySelector('.message-box')
var sendMessage = document.querySelector('.send-btn')
var MessageArea = document.querySelector('.message-area')
var activeUsers = document.querySelector('.active-users')
var activeUser = document.querySelector('.user-profile')

var userProfilePicture = document.querySelector('.profile-pic')

var toggleMode = document.querySelector('.toggle-mode')
var navbar = document.querySelector('.navbar')
var sidebar = document.querySelector('.left-section')
var messageSent = document.getElementsByClassName("message-sent")
var individualRooms = document.querySelectorAll('a')

var darkmode = false

toggleMode.addEventListener('click',function(e)
    {
        document.body.classList.toggle('body-dark')
        navbar.classList.toggle('navbar-dark')
        sidebar.classList.toggle('sidebar-dark')
        darkmode = !darkmode

        for(let room of individualRooms)
        {
            room.classList.toggle('message-dark')
        }
        
        for(let message of messageSent)
        {
            message.classList.toggle('message-dark')
        }
    })


const socket = io("https://yarnsss.netlify.app")
socket.on("connect" , ()=>
{
    socket.emit('user-joined',params,profilePicture)

    socket.on('userJoined',(userId) => {
        userProfilePicture.innerHTML = `<img src="${profilePicture}" alt="">`
        welcomeUser(`</p>Welcome to the chat ${userId}</p>`)
    })

    socket.on('disconnected', ()=> {
        
    })
    
    currentUser = socket.id
}),



socket.on("recievedMessage" , (rcvMsg,user,id,picture,recipientUsername)=> {

    //changed Section 
    console.log(user + " recieved just " + new Date().getTime().toString());
    if(user === selectedUser.username || recipientUsername === selectedUser.username)
    {
        displayMessage(rcvMsg,user,id,picture)
    }
    else
    {
        console.log(`message from ${user}`)
    }
    
    
})

//drastically changed how rooms and active users are displayed
//down here ||||
socket.on('connectedUsers',(users) => {
    activeUsers.innerHTML = `<div class="dropdown-btn">
                        <img src="images/dropdownbtn.png" alt="">
                        <p>active users</p>
                    </div>`
    for( let user of users)
    {
        activeUsers.innerHTML += `<div onclick="privateChat('${user.username}','${user.userId}')" class="user-profile">
        <p> <span class = "active-dot">&#x2024;</span> ${user.username}</p>
        </div>`


        onlineUsersArea.push()
        
    }
})

// added functionality for joining rooms and recieving already sent messages
//down here |||
window.joinRoom = function(e)
{
    e.preventDefault()
    var roomName = e.target.id
    selectedUser = {username:roomName,userId:roomName}
    socket.emit('joinRoom',roomName)
    privateChat(roomName,roomName)
}



window.privateChat = function(username,userId)
{
    //Changed Section 
   socket.emit('displayPrevious')
   socket.on("previousMessages",(messages) =>{
    allMessages = messages
    // displatHistory(messages)
    MessageArea.innerHTML = ""
    selectedUser = {username,userId}
    // console.log(selectedUser);
    // console.log(allMessages);

    if(username !== userId)
    {
        var privateMessages = allMessages.filter((message) => (message.username === params && message.recipient === selectedUser.username) || (message.username === selectedUser.username && message.recipient === params))
    }
    else{
        var privateMessages = allMessages.filter((message) => message.recipient === selectedUser.username)

    }
    // console.log(privateMessages);
    displatHistory(privateMessages)
})
}



//made changes to the send message listener

sendMessage.addEventListener('click' , function(e){

    //changed Section 
    e.preventDefault()
    socket.emit("sentMessage",userMessage.value,params,profilePicture,{username:selectedUser.username,selectedId:selectedUser.userId})

    if(selectedUser.username !== selectedUser.userId)displayMessage(userMessage.value,params,socket.id,profilePicture)
  
})

socket.on("previousMessages",(messages) =>{
    //changed
    allMessages = messages
    // displatHistory(messages)
})

// function loadPrevMessages(messages)
// {
//     // const userMessage = messages.filter((msg) => msg.username === params)
//     // const otherMessage = messages.filter((msg) => msg.username !== params)
//     disp
// }   

function welcomeUser(message)
{
    MessageArea.innerHTML += `<div class = "welcome-message">${message}</div>`
    MessageArea.scrollTop = MessageArea.scrollHeight

}

function displatHistory(messages)
{
    //changed Section 

    messages.forEach((msg) => {

        userMessage.value = ""
        if(msg.username === params)
        {
            
            MessageArea.innerHTML += `<div class = "current-message"><div class ='message'><h4 class='sender-id'>${msg.username}</h4>
            <p class='message-sent sent ${(darkmode)?'message-dark':''}'>${msg.message}</p></div><div class = "userProfile"><img src="${profilePicture}" alt="" ></div></div>`
        }
        else{
            
            MessageArea.innerHTML += `<div class = "other-message"><div class = "userProfile"><img src="${msg.profilepic}" alt="" ></div><div class ='message recieved-message'><h4 class='reciever-id'>${msg.username}</h4>
            <p class='message-sent ${(darkmode)?'message-dark':''}'>${msg.message}</p></div></div>`
        }
        
    })
        MessageArea.scrollTop = MessageArea.scrollHeight
}


function displayMessage(message , user,id,picture)
{   
    userMessage.value = ""
    if(id === currentUser)
    {
        
        MessageArea.innerHTML += `<div class = "current-message"><div class ='message'><h4 class='sender-id'>${user}</h4>
         <p class='message-sent sent ${(darkmode)?'message-dark':''}'>${message}</p></div><div class = "userProfile"><img src="${profilePicture}" alt="" ></div></div>`
    }
    else{

        MessageArea.innerHTML += `<div class = "other-message"><div class = "userProfile"><img src="${picture}" alt="" ></div><div class ='message recieved-message'><h4 class='reciever-id'>${user}</h4>
         <p class='message-sent ${(darkmode)?'message-dark':''}'>${message}</p></div></div>`
    }

    MessageArea.scrollTop = MessageArea.scrollHeight

}



