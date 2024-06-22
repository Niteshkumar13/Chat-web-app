const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const protectRoute = async (req,res,next)=>{
  try{
   const token = req.cookies.jwt;
   if (!token){
    return res.status(401).json({error:"unauthorize"});
   }
   const decode = jwt.verify(token,process.env.JWT_TOKEN);
   if (!decode){
    return res.status(401).json({error:"unauthorize"})
   }
   const user = await User.findById(decode.userid).select("-password");
   if (!user){
    return res.status(401).json({error:"user not found"})
   }
   req.user = user;
   next();
  }
  catch (e){
    console.log("something wrong in middlware");
    res.status(500).json({error:"internal server error"})
  }
}
module.exports = protectRoute;