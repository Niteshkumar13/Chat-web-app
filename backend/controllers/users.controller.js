const User = require("../models/user.model");
const Conversation = require("../models/chat.model");
const getUsers = async (req, res) => {
    try {
        const inputValue = req.query.search;
        const loggedUser = req.user._id;
        const keyWord = inputValue ? {
            $or: [
                { fullName: { $regex: inputValue, $options: "i" } }, // Using inputValue instead of "hello"
                { email: { $regex: inputValue, $options: "i" } }      // Using inputValue instead of "hello"
            ]
        } : {};

        const allUsers = await User.find(keyWord).find({ _id: { $ne: loggedUser } }).select("-password");
        res.status(200).json(allUsers);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error " })
    }
}
const chattedUser = async (req, res) => {
    try {
        const loggedUser = req.user._id;
        const allUser = await Conversation.find({ participants: { $elemMatch: { $eq: loggedUser } } }, { participants: 1, latestMessage: 1 }).populate("participants","-password").populate("latestMessage");
        res.status(200).json(allUser);
    }
    catch (e) {
        res.status(500).json({ error: "internal server error " })
    }
}

const updateSeen = async ({ Adder, seen }) => {
    try {
            const user = await User.find({_id:Adder,"status.userSeen": {  $in: seen} }).select("fullName");
            if(user.length === 0){
              await User.findByIdAndUpdate(Adder,{$push:{"status.userSeen":seen}});
              
            }
    }
    catch (e) {
        console.log("something went wrong! " + e);
    }
}
const getStatusView = async (req,res)=>{
  try{
    const loggedUser = req.user._id;
    const number = await User.find({_id: loggedUser})
    .select("status.userSeen")
    .populate({ path: "status.userSeen", select: "fullName profilePic" });
    res.status(200).json(number);
  }
  catch{
    res.status(500).json({ error: "internal server error " })
  }
}
module.exports = { getUsers,getStatusView, chattedUser, updateSeen }