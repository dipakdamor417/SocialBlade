import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from "multer";
import helmet from "helmet";
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/posts.js'

import bodyParser from "body-parser";
import { register } from './controller/auth.js';
import { createPost } from './controller/posts.js';
import { verifytoken } from './middleware/auth.js';

// dummy file for data showing on front page
import { users, posts } from "./data/index.js";
import User from './model/User.js';
import Post from './model/Post.js';


// for  configuration of file and dir name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // for using .env file

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '80mb', extend: true }));
app.use(cors());
// set the directory where we keep our assets images files. exptra
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }

})

const upload = multer({ storage })

app.post('/auth/register', upload.single("picturepath"), register)
// create
app.post("/posts", verifytoken, upload.single("picture"), createPost)


// path routes 

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)




// mongoose setup
const PORT = process.env.PORT || 3001; // if port not working other port 3001
mongoose.connect("mongodb://localhost:27017/SocialPedia").then(() => {
    console.log("Connected to db")
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
        // dummy data adding on
        // Post.insertMany(posts);e time only
        // User.insertMany(users);
    })
}).catch((error) => {
    console.error("Error connecting to db:", error)
})