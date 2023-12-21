import { Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const [updateData, setUpdateData] = useState({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        location: user.location || "",
        occupation: user.occupation || "",
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${user._id}`, {
                    method: "GET",
                    headers: { Authorization: `mynamei ${token}` },
                });
                const data = await response.json();
                console.log(data);
                setUpdateData(data);
            }
            catch (error) {
                toast.error("Error fetching user data:", error);
            }
        };

        getUser();
    }, [user._id, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/users/${user._id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `mynamei ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });
            await response.json();

            if (response.ok) {
                toast.success("Successfully data edited")
                setTimeout(() => {
                    navigate("/home")
                }, 200)
            } else {
                toast.error("Error updating user profile:", response.statusText);
            }
        } catch (error) {
            toast.error("Error updating user profile:", error);
        }
    };
    return (

        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"  >

            <Box margin="2rem">
                <form onSubmit={handleSubmit} style={isNonMobile ? { display: "flex", flexWrap: "wrap", justifyContent: "center" } : { display: "flex", flexDirection: "column" }}>


                    <TextField
                        label="First Name"
                        name="firstname"
                        value={updateData.firstname}
                        onChange={handleInputChange}
                        style={isNonMobile ? { width: '100%' } : {}}

                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={updateData.lastname}
                        onChange={handleInputChange}
                        margin="normal"
                        style={isNonMobile ? { width: '100%' } : {}}
                    />
                    <TextField
                        disabled
                        label="Email"
                        name="email"
                        value={updateData.email}
                        style={isNonMobile ? { width: '100%' } : {}}
                        margin="normal"
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={updateData.location}
                        onChange={handleInputChange}
                        fu style={isNonMobile ? { width: '100%' } : {}}
                        margin="normal"
                    />
                    <TextField
                        label="Occupation"
                        name="occupation"
                        value={updateData.occupation}
                        onChange={handleInputChange}
                        style={isNonMobile ? { width: '100%' } : {}}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Update Profile
                    </Button>
                    <ToastContainer />
                </form>

            </Box>
        </Box>
    );
};

export default EditProfile;
