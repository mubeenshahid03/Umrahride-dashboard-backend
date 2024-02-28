const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    customerName:{
        type:String,
        // required:true,
    },
    customerEmail:{
        type:String,
        // required:true,
    },
    customerWhatsapp:{
        type:String,
        // required:true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now 
        
    },
});

const User = mongoose.model('User', userSchema, "users");
module.exports = User;
