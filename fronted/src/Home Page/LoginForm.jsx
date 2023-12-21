import React, { useState } from 'react';
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import Dropzone from 'react-dropzone';
import FlexBetween from '../Components/Flex';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picturepath: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picturepath: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};


export const LoginForm = ({ isRegisterPage }) => {

    const [pageType, setPageType] = useState(isRegisterPage ? "register" : "login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {

        try {

            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            formData.append("picturepath", values.picturepath.name);

            const savedUserResponse = await fetch(
                "http://localhost:3001/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const savedUser = await savedUserResponse.json();
            if (savedUserResponse.ok) {

                if (savedUser) {
                    setPageType("login");
                }
                toast.success("Successfully registered");
                onSubmitProps.resetForm();
            }
            else if (savedUserResponse.status === 400) {
                toast.info("Email already exists");
            }
            else {
                toast.info("Some error occured");
                setPageType("register")
            }
        }
        catch (error) {
            toast.error(error)
        }
    };

    const login = async (values, onSubmitProps) => {

        try {
            const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const loggedIn = await loggedInResponse.json();

            onSubmitProps.resetForm();
            console.log(loggedIn.msg)

            if (loggedInResponse.ok) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                toast.success("Successfully Login");
                setTimeout(() => {
                    navigate("/home");
                }, 700);

            }
            else if (loggedIn.msg === "Password is incorrect") {
                toast.info("Password is incorrect");
            } else if (loggedIn.msg === "User not found") {
                toast.error("User Not Found");
            }
            else {
                navigate("/login");
            }
        }
        catch (error) {
            toast.error(error);
        }

    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                validationSchema={isLogin ? loginSchema : registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            {
                                isRegister && (

                                    <>

                                        <Helmet>
                                            <title>SocialBlade-Register</title>
                                        </Helmet>
                                        <TextField
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstname}
                                            name="firstname"
                                            error={
                                                Boolean(touched.firstname) && Boolean(errors.firstname)
                                            }
                                            helperText={touched.firstname && errors.firstname}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastname}
                                            name="lastname"
                                            error={Boolean(touched.lastname) && Boolean(errors.lastname)}
                                            helperText={touched.lastname && errors.lastname}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            label="Location"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.location}
                                            name="location"
                                            error={Boolean(touched.location) && Boolean(errors.location)}
                                            helperText={touched.location && errors.location}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="Occupation"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.occupation}
                                            name="occupation"
                                            error={
                                                Boolean(touched.occupation) && Boolean(errors.occupation)
                                            }
                                            helperText={touched.occupation && errors.occupation}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <Box
                                            gridColumn="span 4"
                                            border={`1px solid ${palette.neutral.medium}`}
                                            borderRadius="5px"
                                            p="1rem"
                                        >
                                            <Dropzone
                                                acceptedFiles=".jpg,.jpeg,.png"
                                                multiple={false}
                                                onDrop={(acceptedFiles) =>
                                                    setFieldValue("picturepath", acceptedFiles[0])
                                                }
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <Box
                                                        {...getRootProps()}
                                                        border={`2px dashed ${palette.primary.main}`}
                                                        p="1rem"
                                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                                    >
                                                        <input {...getInputProps()} />
                                                        {!values.picturepath ? (
                                                            <p>Add Picture Here(Compulsory)</p>
                                                        ) : (
                                                            <FlexBetween>
                                                                <Typography>
                                                                    {values.picturepath.name}</Typography>
                                                                <EditOutlinedIcon />
                                                            </FlexBetween>
                                                        )}
                                                    </Box>
                                                )}
                                            </Dropzone>
                                        </Box>
                                    </>
                                )}
                            <Helmet>
                                <title> SocialBlade-Login Page</title>
                            </Helmet>
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        {/* BUTTONS */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}
                            >
                                {isLogin ? "LOGIN" : "REGISTER"}
                            </Button>
                            <ToastContainer />
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                    if (isLogin) {
                                        navigate("/register");
                                    } else {
                                        navigate("/login");
                                    }
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light,
                                    },
                                }}
                            >
                                {isLogin
                                    ? "Don't have an account? Sign Up here."
                                    : "Already have an account? Login here."}
                            </Typography>


                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};
