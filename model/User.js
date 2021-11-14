const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxLength:50
    },
    email:{
        type:String,
        trim:true,  //띄어쓰기 가능하게 만듦
        unique:1
    },
    password:{
        type:String,
        minLength:5
    },
    lastname:{
        type:String,
        maxLength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

const User=mongoose.model('User',userSchema)

module.exports={User}