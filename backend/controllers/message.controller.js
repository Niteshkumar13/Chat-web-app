const Conversation = require("../models/chat.model");
const Message = require("../models/message.model");
const { io, receiverSocketId,onlineData } = require("../socketIo/socketIo")
const sendMessage = async (req, res) => {
    try {
        const { message, link, image, audio, video, document } = req.body;
        const { id } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: { $all: [id, senderId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [id, senderId]
            })
            const receiverOnline = receiverSocketId(id);
            const senderOnline = receiverSocketId(senderId);
            io.to(senderOnline).to(receiverOnline).emit('updateData', conversation)
            
        }
        let x = false;
        console.log("online data is ",onlineData)
        const p = onlineData.filter((item)=>JSON.stringify(item.senderid) ==JSON.stringify(senderId)).length ===1;
        const q = onlineData.filter((item)=>JSON.stringify(item.receiverid) ==JSON.stringify(id)).length ===1;
        const r = onlineData.filter((item)=>JSON.stringify(item.senderid) ==JSON.stringify(id)).length ===1;
        const s = onlineData.filter((item)=>JSON.stringify(item.receiverid) ==JSON.stringify(senderId)).length ===1; 
        if (p&&q&&r&&s){
            x = true;
           
        }
        const newMessage = new Message({
            senderId,
            receiverId: id,
            message,
            document,
            audio,
            video,
            image,
            seen:x,
            link,
            createdAt:new Date().toLocaleString()
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id);
            conversation.latestMessage = newMessage._id;
        }
        await Promise.all([conversation.save(), newMessage.save()])
        const receiverOnline = receiverSocketId(id);
        if (receiverOnline) {
            io.to(receiverOnline).emit('newMessage', newMessage)
        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("error to send message", error.message)
        res.status(500).json({ error: "internal server error " })
    }
}
const getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, id] }
        }).populate("messages");
        if (!conversation) {
            return res.status(201).json([])
        }
        res.status(200).json(conversation.messages)
    }
    catch (e) {
        console.log("error to send message")
        res.status(500).json({ error: "internal server error " })
    }
}
const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.body;
        const { id } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({ participants: { $all: [senderId, id] } });
        if (!conversation) {
            return res.status(201).json({ error: "error in deleting the message" })
        }
        const findUserAdmin = await Message.findOne({ "_id": messageId })
        const condition = JSON.stringify(findUserAdmin.senderId) === JSON.stringify(senderId)
        if (condition) {
            const deleteMessages = await Message.deleteOne({ "_id": messageId });
            await Conversation.updateOne({participants: { $all: [senderId, id]}},{$pull:{ messages: messageId }});
            const receiverOnline = receiverSocketId(id);
            if (receiverOnline) {
                io.to(receiverOnline).emit('updateMessage', { messageId, senderId })
            }
            return res.status(201).json({ item: deleteMessages })
        }
        return res.status(201).json({ error: "you are not admin" })
    }
    catch (e) {
        console.log("error to delete message", e.essage)
        res.status(500).json({ error: "internal server error " })
    }
}
module.exports = { sendMessage, getMessage, deleteMessage };