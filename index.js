const express = require("express");
const cors = require("cors");
const  mongoose = require("mongoose");
const User = require("./models/User");
const app = express()


app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://blog:KqlTO9WlGpW2UAo3@clusterblogpost.wurtrvt.mongodb.net/?retryWrites=true&w=majority")

app.post("/register" , async (req , res) => {
    const {username , password} = req.body
   
    try {
        const userDoc =  await User.create({ username, password})
        res.json(userDoc)
    } catch (error) {
        res.status(400).json(error)
    }

})

//blog
//KqlTO9WlGpW2UAo3

//mongodb+srv://blog:KqlTO9WlGpW2UAo3@clusterblogpost.wurtrvt.mongodb.net/?retryWrites=true&w=majority

app.listen(4000)