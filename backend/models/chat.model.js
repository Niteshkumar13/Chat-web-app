const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default:[]
        }
    ],
    latestMessage:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default:null
    }
}, { timestamps: true });
const Conversation = mongoose.model("Conversation",chatSchema);
module.exports = Conversation;