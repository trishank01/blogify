const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const fs = require("fs");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "sdf934ndfkplps";

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const uploadMiddleware = multer({ dest: "uploads/" });

mongoose.connect(
  "mongodb+srv://blog:KqlTO9WlGpW2UAo3@clusterblogpost.wurtrvt.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
      if (error) throw error;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const { token } = req.cookies;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const PostDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(PostDoc);
  });
});

app.get("/post", async (req, res) => {
  const Posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(Posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

// app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
//   let newPath = null;
//   if (req.file) {
//     const { originalname, path } = req.file;
//     const { token } = req.cookies;
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//   }
//   const { token } = req.cookies;

//   jwt.verify(token, secret, {}, async (err, info) => {
//     if (err) throw err;
//     const { id, title, summary, content } = req.body;
//     const postDoc = await Post.findById(id);
//     const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
//     res.json({ isAuthor, postDoc, info });
//     if (!isAuthor) {
//       return res.status(400).json("you are not the author");
//     }

//     await postDoc.updateOne({
//       title,
//       summary,
//       content,
//       cover: newPath ? newPath : postDoc.cover,
//     });
//     res.json(postDoc);
//   });
// });

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

//blog
//KqlTO9WlGpW2UAo3

//mongodb+srv://blog:KqlTO9WlGpW2UAo3@clusterblogpost.wurtrvt.mongodb.net/?retryWrites=true&w=majority

app.listen(4000);
