const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    profilePic: {
        type: String,
        default: ''
    },
    status: {
        type: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        text: {
            type: String,
            default: null
        },
        userSeen:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
}, { timestamps: true })
const User = mongoose.model("User", userSchema);
module.exports = User;