import {io, Socket} from 'socket.io-client'

const urlParam  = new URLSearchParams(window.location.search)
const params  = urlParam.get('username');
const profilePicture  = urlParam.get('profilepic');
console.log(params);
console.log(profilePicture);
var onlineUsersArea = []

var userMessage = document.querySelector('.message-box')
var sendMessage = document.querySelector('.send-btn')
var MessageArea = document.querySelector('.message-area')
var activeUsers = document.querySelector('.active-users')
var activeUser = document.querySelector('.user-profile')

var userProfilePicture = document.querySelector('.profile-pic')
var currentUser

var toggleMode = document.querySelector('.toggle-mode')
var navbar = document.querySelector('.navbar')
var sidebar = document.querySelector('.left-section')
var messageSent = document.getElementsByClassName("message-sent")
var darkmode = false

toggleMode.addEventListener('click',function(e)
    {
        document.body.classList.toggle('body-dark')
        navbar.classList.toggle('navbar-dark')
        sidebar.classList.toggle('sidebar-dark')
        darkmode = !darkmode
        
        for(let message of messageSent)
        {
            message.classList.toggle('message-dark')
         }
    })


const socket = io("https://mighty-savannah-05559.herokuapp.com/")
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



socket.on("recievedMessage" , (rcvMsg,user,id,picture)=> {
    
    displayMessage(rcvMsg,user,id,picture)
})

socket.on('connectedUsers',(users) => {
    activeUsers.innerHTML = `<p>#active users</p>`
    for( let user of users)
    {
        activeUsers.innerHTML += `<div onclick="privateChat('${user.userId}')" class="user-profile">
        <p>${user.username}</p>
        </div>`


        onlineUsersArea.push()
        
    }
})



window.privateChat = function(userId)
{
   MessageArea.innerHTML = ""
    currentUser = userId
   
}


sendMessage.addEventListener('click' , function(e){
    e.preventDefault()
    socket.emit("sentMessage",userMessage.value,params,profilePicture)
  
})

socket.on("previousMessages",(messages) =>{
    displatHistory(messages)
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

    messages.forEach((msg) => {

        userMessage.value = ""
        if(msg.username === params)
        {
            
            MessageArea.innerHTML += `<div class = "current-message"><div class ='message'><h4 class='sender-id'>${msg.username}</h4>
            <p class='message-sent sent'>${msg.message}</p></div><div class = "userProfile"><img src="${profilePicture}" alt="" ></div></div>`
        }
        else{
            
            MessageArea.innerHTML += `<div class = "other-message"><div class = "userProfile"><img src="${msg.profilepic}" alt="" ></div><div class ='message recieved-message'><h4 class='reciever-id'>${msg.username}</h4>
            <p class='message-sent'>${msg.message}</p></div></div>`
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



