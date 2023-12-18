import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
        firstname:{
            type:String,
            require: true,
            min:3,
            max:60
        },
        lastname:{
            type:String,
            require: true,
            min:3,
            max:60
        },
        email:{
            type:String,
            require: true,
            min:3,
            max:60
        },
        password:{
            type:String,
            required: true,
            min:3,
        },
        picturepath:{
            type:String,
            default:""
        },
        friends:{
            type:Array,
            default:[]
        },
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number,    
    },{
        timestamps:true
    }
)

const User=mongoose.model("User",UserSchema)
export default User;