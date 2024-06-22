const  jwt = require('jsonwebtoken');

const generateToken = async ({userid,res})=>{
  const token = await jwt.sign({userid},process.env.JWT_TOKEN,{
    expiresIn:'20d',
  })
  res.cookie("jwt",token,{
    maxAge: 20* 24 * 60 * 60 * 1000,
    httpOnly:true,

    sameSite:'None',
    secure:true,
    path:'/'
  })
}
module.exports = generateToken;