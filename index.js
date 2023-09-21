const express = require("express");
const cors = require("cors");
const  mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const app = express()


const salt = bcrypt.genSaltSync(10)
const secret = "sdf934ndfkplps"

app.use(cors({
    credentials : true, origin : "http://localhost:3000"
}));
app.use(express.json())
app.use(cookieParser())

mongoose.connect("mongodb+srv://blog:KqlTO9WlGpW2UAo3@clusterblogpost.wurtrvt.mongodb.net/?retryWrites=true&w=majority")

app.post("/register" , async (req , res) => {
    const {username , password} = req.body
   
    try {
        const userDoc =  await User.create({ 
            username,
            password:bcrypt.hashSync(password , salt)
        })
        res.json(userDoc)
    } catch (error) {
        res.status(400).json(error)
    }
})




app.post("/login" , async (req , res) => {
    const {username , password} = req.body
    const userDoc = await User.findOne({username})
    const passOk =  bcrypt.compareSync(password, userDoc.password)
    if(passOk){
      //logged in
       jwt.sign({username , id: userDoc._id} , secret , {} , (error , token) => {
         if(error) throw error;
         res.cookie("token" , token).json({
            id : userDoc._id,
            username

         })
       })
    }else{
        res.status(400).json("wrong credentials")
    }
})


app.get("/profile" , (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token , secret , {}, (err , info) => {
       if(err) throw err;
       res.json(info)
    })
})


app.post("/logout" , (req , res) => {
    res.cookie("token" , '').json('ok')
})

//blog
//KqlTO9WlGpW2UAo3

//mongodb+srv://blog:KqlTO9WlGpW2UAo3@clusterblogpost.wurtrvt.mongodb.net/?retryWrites=true&w=majority

app.listen(4000)