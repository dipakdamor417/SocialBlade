import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js'

// Register

  export const register = async (req, res) => {
    try {
      
    console.log("Hii  ");
      const {
        firstname,
        lastname,
        email,
        password,
        picturepath,
        friends,
        location,
        occupation,
      } = req.body;

    console.log(req.body);
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: passwordHash,
        picturepath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 1000),
        impressions: Math.floor(Math.random() * 1000),
      })

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);

    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


// Login
export const login = async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await User.findOne({ email: email });
   
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
