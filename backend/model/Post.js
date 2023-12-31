import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstname:{
            type:String,
            require: true
        },
        lastname:{
            type:String,
            require: true,
        },
        location:String,
        description:String,
        picturePath:String,
        userPicturePath:String,    
        likes:{
            type:Map,
            of :Boolean
        },
        comments:{
            type:Array,
            default:[]
        }
    }, {
    timestamps: true
}
)

const Post = mongoose.model("Post", PostSchema)
export default Post;
