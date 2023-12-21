import User from '../model/User.js'
import Post from '../model/Post.js'


// create a post
export const createPost=async (req,res)=>{
    try{
        const { userId,description,picturepath,userPicturePath} = req.body;
        console.log(picturepath);
        console.log(userPicturePath);
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,firstname:user.firstname,lastname:user.lastname,location:user.location,description,userPicturePath:userPicturePath,picturepath,likes:{},comments:[]
        })

        await newPost.save();

        const post =await Post.find()
        res.status(201).json(post);
    }
    catch (err) {
        res.status(409).json({ error: err.message });
    }
    
}

// get all posts 
export const getFeedPosts=async (req,res)=>{
    try{
        console.log("hello get all post");
        const post=await Post.find();
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }

}
// get post of single user 
export const getUserPosts=async (req,res)=>{
    try{
  
        const {userId}=req.params;
        const post=await Post.find({userId});
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }

}

// like a pist
export const likePost=async (req,res)=>{
    try{
        const {id}=req.params;
        const {userId}=req.body;
        const post=await Post.findById(id);
        const isLiked=post.likes.get(userId);


        if(isLiked){
            post.likes.delete(userId,true);
        }
        else{
            post.likes.set(userId,true)
        }

        const updatePost=await Post.findByIdAndUpdate(
            id,{likes:post.likes},{new :true}
        )

        res.status(200).json(updatePost);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }

}
