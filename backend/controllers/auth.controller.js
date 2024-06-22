const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require("../utils/token")
const { io} = require("../socketIo/socketIo")
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        const isTrue = await bcrypt.compare(password, user?.password || '');
        if (!user || !isTrue) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        await generateToken({ userid: user._id, res });
        const {type,url,text} = user.status;
        res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic,status:{type,url,text}})
    }
    catch (e) {
        console.log("error in login", e.message)
        res.status(500).json({ error: "internal server error" })
    }
}
// sign up function 
const signup = async (req, res) => {
    try {
        const { fullName, email, password, picture } = req?.body;
        const findEmail = await User.findOne({ email });
        if (!findEmail) {
            const userName = fullName.split(" ");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const profilePic = picture ? picture : `https://avatar.iran.liara.run/username?username=${userName[0]}+${userName[1]}`
            const newUser = new User({ fullName, email, password: hashedPassword, profilePic });
            await newUser.save();
            await generateToken({ userid: newUser._id, res });
            res.status(201).json({ fullName, email, profilePic,id:newUser._id,status:{type: null,url:null,text:null}})
         
        }
        else {
            res.status(400).json({ error: "user already exist" })
        }
    }
    catch (e) {
        res.status(500).json({ error: "internal server error" })
    }
}
// logout
const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" })
}
// chnage dp and name
const changeNameDP = async (req, res) => {
    try {
        const { fullName, profilePic } = req.body;
        const user1 = req.user;
        const user2 = await User.updateOne({ email: user1.email }, { $set: { fullName, profilePic } });
        const user = await User.findOne({ email: user1.email });
        const {type,url,text} = user.status;
        res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic,status:{type,url,text}})
        // res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic,status:user.status })
    }
    catch (e) {
        res.status(500).json({ error: "internal server error" })
    }
}

// localStorage item has been updated
const localStorage = async (req, res) => {
    try {
        const { email,fullName,id,profilePic} = req.body;
        const user = await User.findOne({ email,fullName,profilePic,_id:id});
        if(!user){
            return res.status(500).json({ error: "unAuthorize user" })
        }
    }
    catch (e) {
        res.status(500).json({ error: "internal server error" })
    }
}

// adding the status
const addStatus = async (req, res) => {
    try {
        const { text,type,url } = req.body;
        const user1 = req.user;
        const user = await User.findOne({ email: user1.email });
        if (user){
            const user2 = await User.updateOne({ email: user1.email},{ $set: { status:{text,type,url} } } ); 
            const user = await User.findOne({ email: user1.email });
            io.emit('updateData', user2)
            return res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic,status:{ text:user.status.text,type:user.status.type,url:user.status.url } })
        }
        res.status(500).json({ error: 'User not found'})
    }
    catch (e) {
        res.status(500).json({ error: "internal server error" })
    }
}

// delete the status by user
const deleteStatus = async (req, res) => {
    try {
        const user1 = req.user;
        const user = await User.findOne({ email: user1.email });
        if (user){
            const user2 = await User.updateOne({ email: user1.email},{ $set: { status:{text:null,type:null,url:null} } } ); 
            const user = await User.findOne({ email: user1.email });
            io.emit('updateData', user2)
            const {type,url,text} = user.status;
            return res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic,status:{type,url,text}})
            // return res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic,status:user.status })
        }
        res.status(500).json({ error: 'User not found'})
    }
    catch (e) {
        res.status(500).json({ error: "internal server error" })
    }
}
module.exports = { login, signup, logout, changeNameDP,localStorage,addStatus,deleteStatus}