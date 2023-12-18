import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import bg from "../bg.jpg";

const MainPage = () => {
    const navigate = useNavigate();
    const containerStyle = {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative", // Set position to relative for absolute positioning of background
    };

    const backgroundStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        filter: "blur(5px)", // Apply blur filter only to the background image
    };

    const contentStyle = {
        zIndex: 1, // Ensure that content appears above the background
    };

    return (
        <>
            <Box style={containerStyle}>
                <Box style={backgroundStyle} />
                <Box style={contentStyle}>
                    <Box textAlign="center" marginTop="2rem" fontFamily="monospace">
                        <Typography fontSize="5em"  color="#033765">
                            SocialBlade
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography fontSize="3em" fontFamily="revert-layer" color="#3f413b">
                            Please register to use our application for using SocialBlade.
                        </Typography>
                    </Box>
                    <Box>
                        <Box width="100%" textAlign="center" m="20px auto">
                            <Button onClick={() => navigate("/login")}>
                                <Typography fontSize="3em" color="#ffd900">
                                    Login
                                </Typography>{" "}
                            </Button>
                        </Box>
                        <Box width="100%" textAlign="center" m="20px auto">
                            <Button onClick={() => navigate("/register")}>
                                <Typography fontSize="3em" color="#ffd900">
                                    Register
                                </Typography>{" "}
                            </Button>
                        </Box>
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </>
    );
};
export default MainPage;
