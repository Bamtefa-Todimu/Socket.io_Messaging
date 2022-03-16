const express = require('express')
const app = express()
const routes = express.Router()
const bodyParser = require('body-parser')
const users = require('../models/users')
const messages = require('../models/messages')

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
    cb(null, '../client/uploads')
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
            profilePicture: "uploads/" + req.body.username + "_" + req.file.originalname
        })
        const savedUser = await createdUser.save()

        res.json({message:"successfully registed"})
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
            res.redirect(`https://heuristic-keller-7238af.netlify.app/chat.html?username=${req.body.username}&profilepic=${verifyUser[0].profilePicture}`)
        }
        else
        {
            res.json({error:"user does not exist"})
        }
    }
    catch(e)
    {
        console.log(e);
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

exports.Users = routes