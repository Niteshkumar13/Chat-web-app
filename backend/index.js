const http = require("http");
const express = require("express");
var bodyParser = require('body-parser');
require('dotenv').config()
const cors = require("cors");
const routes = require('./authentication/auth.routes');
const messageRoutes = require('./authentication/message.routes');
const changeNamePic = require('./authentication/change.routes');
const userRoutes = require('./authentication/user.routes');
const connect = require("./database/db");
const cookieParser = require("cookie-parser");
// const app = express();
const {app,io,server}  = require("./socketIo/socketIo")
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT, credentials: true }));
const port = process.env.PORT || 3001;
const users = [];
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("hello sir 🤡🤡🤡");
})
app.use("/auth", routes);
app.use("/api/messages",messageRoutes);
app.use("/users",userRoutes);
app.use("/change",changeNamePic)
server.listen(port, () => {
  connect();
  console.log(`Working`);
})