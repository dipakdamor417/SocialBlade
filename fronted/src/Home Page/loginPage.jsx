import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { LoginForm } from "./LoginForm.jsx";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isRegisterPage = window.location.pathname.includes("/register");

    return (
        <Box  backgroundColor={theme.palette.background.alt}height="100%">
            <Box width="100%" backgroundColor={theme.palette.background.alt} textAlign="center" p="2rem">
                <Typography
                    fontWeight="bold" color="primary" fontSize="48px"
                >
                    SocialBlade
                </Typography>
                <Box width={isNonMobileScreens ? "50%" : "95%"}  m="1rem auto" backgroundColor={theme.palette.background.alt} borderRadius="1.5rem">
                    <Typography fontWeight="500" variant='h5' sx={{mb:"2rem"}} >
                        <Box textAlign="center"  mb="2rem">
                            Welcome to SocialBlade
                            </Box>
                        <LoginForm isRegisterPage={isRegisterPage}  />
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
