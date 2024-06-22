const mongoose = require("mongoose");
const connect = ()=>{
    try{
        mongoose.connect(process.env.DATABASE);
         console.log("connected sucessfully")
    }
    catch (e){
     console.log("error to connect mongodb ",e)
    }
}
module.exports = connect;