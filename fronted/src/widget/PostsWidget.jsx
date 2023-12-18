import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `mynamei ${token}` },
        });
        console.log(response);
        const data = await response.json();
        setUser(data);
    };

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `mynamei ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `mynamei ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUser();
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstname,
                    lastname,
                    description,
                    location,
                    picturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstname} ${lastname}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={user?.picturepath} // Use user?.picturepath to avoid errors if user is not yet loaded
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;
