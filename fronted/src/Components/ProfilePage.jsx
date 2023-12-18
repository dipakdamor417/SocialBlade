import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Home Page/Navbar";
import FriendListWidget from "../widget/FriendListWidget";
import UserWidget from "../widget/UserWidget";
import MyPostWidget from "../widget/MyPostWidget";
import PostsWidget from "../widget/PostsWidget";

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery(("min-width:1000px"));

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `mynamei ${token}` },
        });
        
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;
    return (
        <Box>
          <Navbar />
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={userId} picturepath={user.picturepath} />
              <Box m="2rem 0" />
              <FriendListWidget userId={userId} />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <MyPostWidget picturepath={user.picturepath} />
              <Box m="2rem 0" />
              <PostsWidget userId={userId} isProfile />
            </Box>
          </Box>
        </Box>
      );
    };

export default ProfilePage;