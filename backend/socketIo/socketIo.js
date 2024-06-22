const { Server } = require("socket.io");
const Message = require("../models/message.model");
const http = require("http");
const {updateSeen} = require("../controllers/users.controller")
const express = require("express");
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT],
    methods: ['GET', 'POST'],
    credentials: true

  }
});
const allUsers = {}
const receiverSocketId = (id) => {
  return allUsers[id]
}
let onlineData = []
const getLength = () => {
  return Object.keys(allUsers).length;
}
io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);
  console.log(`User mongo connected : ${socket.handshake.query.userId}`);
  const userId = socket.handshake.query.userId;
  console.log("user id:",userId)
  if (userId != 'undefined') {
    allUsers[userId] = socket.id
  };
  io.emit("getOnlineUsers", Object.keys(allUsers));
 
  socket.on("online", async ({ senderid, receiverid }) => {
    const x = onlineData.findIndex((item => item.senderid === senderid));
    if (x >= 0) {
      onlineData[x].receiverid = receiverid;
    }
    else {
      onlineData.push({ senderid, receiverid })
    }

  })
  socket.on("winordraw",async({data,id})=>{
    const send = receiverSocketId(id);
    io.to(send).emit('isDrawWin', {data})
  })
  socket.on("request", async ({id,reqName,profilePic}) => {
    const send = receiverSocketId(id);
    io.to(send).emit('isrequest', {name:reqName,profilePic,id:userId})
  })
  socket.on("playGame", async ({ move,opponentid}) => {
    console.log("move and opponent ",{ move,opponentid})
    const send = receiverSocketId(opponentid);
    io.to(send).emit('moveposition', {move})
  })
  socket.on("isAccept",async ({requesteduserid, Name})=>{
    console.log(receiverSocketId,Name)
    const send = receiverSocketId(requesteduserid);
    io.to(send).emit('startplay', {name:Name,id:userId})
  })
  socket.on("markSeen", async ({ messageId, senderid }) => {
    const response = await Message.updateMany({ _id: { $in: messageId } }, { seen: true });
    const send = receiverSocketId(senderid);
    io.to(send).emit('seeMessage', {messageId})
  })
  socket.on("seenStatus",async ({Adder,seen})=>{
    console.log({Adder,seen})
    updateSeen({Adder,seen})
  })
  socket.on("disconnect", () => {
    console.log(onlineData)
    console.log(`user disconnected : ${socket.id}`)
    delete allUsers[userId];
    const x = onlineData.findIndex(item => item.senderid === userId);
    if (x !== -1) {
      onlineData.splice(x, 1);
    }
    console.log("after", onlineData)
    io.emit("getOnlineUsers", Object.keys(allUsers))
  })
})

module.exports = { app, io, server, receiverSocketId, getLength, onlineData };