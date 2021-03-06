const express = require('express')
const app = express()
const routes = express.Router()
const bodyParser = require('body-parser')
const users = require('../models/users')
const messages = require('../models/messages')

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
    cb(null, './uploads')
  },

  filename:function(req,file,cb)
  {
      cb(null,req.body.username + "_" + file.originalname)
  }
})

const upload = multer({storage:storage})


// const users  = [{"todi":"1234"},{"james":"1234"},{"reday":"1234"},{"cody":"1234"}]

routes.post('/register',upload.single('profile-picture'),async(req,res,next) => {
    console.log(req.body)
    console.log(req.file)
    try{
        const createdUser = await users.create({
            username:req.body.username,
            password:req.body.password,
            // profilePicture: "https://mighty-savannah-05559.herokuapp.com/uploads/" + req.body.username + "_" + req.file.originalname
            profilePicture: "uploads/GusDaBoss_gus-avatar.png"
        })
        const savedUser = await createdUser.save()

        res.redirect(`https://yarnsss.netlify.app/`)
    }
    catch(e)
    {
        console.log(e);
    }
})

routes.post('/login', async (req,res) => {
    console.log(req.body)
    try
    {
        const verifyUser = await users.find(req.body)
        if(verifyUser.length > 0)
        {
            console.log(verifyUser);
            // res.json({message:username})
            res.redirect(`https://yarnsss.netlify.app/chat.html?username=${req.body.username}&profilepic=${verifyUser[0].profilePicture}`)
        }
        else
        {
            res.json({error:"user does not exist"})
        }
    }
    catch(e)
    {
        console.log(e);
        res.json({message:"something has occured"})
    }
})

routes.delete("/deleteMessages", async(req,res) => {
    try
    {
        const deletedMessages = await messages.deleteMany({})
    }
    catch(e)
    {
        console.log(e);
    }
})

routes.post("/checking",(req,res) =>{
    res.json({messages:"we here atleast"})
})

exports.Users = routes