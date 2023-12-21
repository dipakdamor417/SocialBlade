import User from '../model/User.js'
import Post from '../model/Post.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log("Get User detail")
    console.log(user.picturepath);
    res.status(200).json(user);
  }
  catch (err) {
    res.status(404).json({ error: err.message });
  }

}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => { User.findById(id) })
    )

    const formattedFriends = friends.map((
      { _id, firstname, lastname, occupation, location, picturepath }) => {
      return { _id, firstname, lastname, occupation, location, picturepath };
    })
    console.log(formattedFriends)
    res.status(200).json(formattedFriends);
  }
  catch (err) {
    res.status(404).json({ error: err.message });
  }

}


// 


export const updateUser = async (req, res) => {

  try {
    const { id } = req.params;
    const userId=id;
    const { firstname, lastname, location, occupation } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          firstname,
          lastname,
          location,
          occupation,
        },
      },
      { new: true }
    );
    const updatedPostUser = await Post.updateMany(
     { userId:id},
      {
        $set: {
          firstname,
          lastname,
          location,
        },
      },
      { new: true }
    );

    if (updatedUser && updatedPostUser) {
      console.log("User updated successfully:", updatedUser);
      res.status(200).json(updatedUser);
    } 
    else {
      console.error("User not found or update failed");
      res.status(404).json({ error: "User not found or update failed" });
    }
  }
  catch (err) {
    res.status(404).json({ error: err.message });
  }

}

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturepath }) => {
        return { _id, firstname, lastname, occupation, location, picturepath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};