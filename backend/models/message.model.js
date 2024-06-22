const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        default: null
    },
    link: {
        type: String,
        default: null
    },
    image: {
        type: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        extension: {
            type: String,
            default: null
        },
        size:{
            type: String,
            default: null
        }
    },
    video: {
        type: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        extension: {
            type: String,
            default: null
        },
        size:{
            type: String,
            default: null
        }
    },
    audio: {
        type: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        extension: {
            type: String,
            default: null
        },
        size:{
            type: String,
            default: null
        }
    },
    document: {
       type: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        extension: {
            type: String,
            default: null
        },
        size:{
            type: String,
            default: null
        }
    },
    seen:{
      type:Boolean,
      default:false
    },
    createdAt: {
        type: String, default: new Date().toLocaleString()
    }

}, { timestamps: true });
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;