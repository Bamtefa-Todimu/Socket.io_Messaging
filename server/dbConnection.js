const mongoose = require('mongoose')

module.exports = async() => 
{
    const dbconnect = await mongoose.connect("mongodb://localhost/MessagingApp" , () => {
        console.log("connected to db");
    })
}