import express  from "express";
import { getUser,getUserFriends,addRemoveFriend,updateUser }  from '../controller/users.js'
import { verifytoken } from "../middleware/auth.js";


const router =express.Router();

// read routes path
router.get("/:id",verifytoken,getUser);
router.get("/:id/friends",verifytoken,getUserFriends);


// update sinlge profil
router.patch("/:id", verifytoken, updateUser);

// update a list  of friends
router.patch("/:id/:friendId",verifytoken,addRemoveFriend)

export default router;