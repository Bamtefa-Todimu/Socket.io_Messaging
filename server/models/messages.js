const mongoose = require('mongoose')


const dbSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    recipient:{
        type:String,
        required:true,
        default:"general"
    },
    message:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        default:"images/socket.svg"
    },
    timeSent:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("messages",dbSchema)