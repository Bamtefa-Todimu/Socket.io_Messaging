const mongoose = require('mongoose')

module.exports = async() => 
{
    const dbconnect = await mongoose.connect("mongodb+srv://restful:rest123@firstsproject.fufha.mongodb.net/messagingApp?retryWrites=true&w=majority" , () => {
        console.log("connected to db");
    })
}