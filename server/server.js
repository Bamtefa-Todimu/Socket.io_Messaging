const express = require('express')
const app = express()
const {Users,userName} = require('./routes/user')
const dbConnection = require('./dbConnection')
const messages = require('./models/messages')
const multer = require('multer')
const serverless = require("serverless-http")

const bodyParser = require('body-parser')

// app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1',Users)
app.use(bodyParser.json())

app.listen(process.env.PORT || 4000, ()=>{
    dbConnection()
    console.log("listening on port 4000");
})


const io = require('socket.io')(process.env.PORT || 3000 , {
    cors:{
        origin:["http://localhost:8080"],
    },
})

var users = []
io.on('connection' , async (socket)=>{

    users.push({
        userId:socket.id,
        username:userName,
        profilePicture:"images/socket.svg"
    })

    try{
        const prevMsg = await messages.find() 
        socket.emit("previousMessages",prevMsg)
    }
    catch(e)
    {
        console.log(e);
    }
    
    console.log(socket.id)
    io.emit("connectedUsers",users)

    socket.on('disconnect', function()
    {
        console.log(socket.id);
        users = users.filter((user) => user.userId !== socket.id)
        io.emit('connectedUsers',users)
        
    })

    socket.on('removeUser',(id) => {
        console.log(id);
    })

    socket.on('privateMessage',(privateUser,msg) => {
        socket.to(privateUser).emit('recievePrivate',msg,socket.id)
    })


    io.emit('connectedUser',socket.id)
    socket.on('sentMessage',async (msg,username,profilepicture) => {
        
        try{
            const saveMessage = await messages.create({
                username:username,
                message:msg,
                profilepic:profilepicture   
            })
            const messageSaved = await saveMessage.save()
            io.emit('recievedMessage',msg,username,socket.id,profilepicture)
        }
        catch(e)
        {
            console.log(e);
        }
    })

    socket.on('joinRoom',async room =>{ 
        await socket.join(room)
        console.log(`${socket.id} : ${room}`);
        
    })

    socket.on('user-joined',(newUser,profilepic) => {
        
        users = users.map((user) => {
            if(user.userId === socket.id)
            {
                return{userId:socket.id, username:newUser, profilePicture:profilepic}
            }
            return user
        })
        io.emit("connectedUsers",users)
        io.emit('userJoined',newUser)
    })
})


