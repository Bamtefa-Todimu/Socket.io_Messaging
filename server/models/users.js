const mongoose = require('mongoose')


const dbSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"./images/socket.svg"
    }
})

module.exports = mongoose.model("users",dbSchema)