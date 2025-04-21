import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField, Button, Typography } from '@mui/material'
import Link from 'next/link';
import React, { useState } from 'react'

function Login() {
    const [toggle, setToggle] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleToggle = () => setToggle(!toggle); // Function to toggle between login and signup
    const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    return (
        <Box sx={{ bgcolor: "#F0F0F0", height: "100vh" }}>
            <Stack direction={"row"} sx={{ justifyContent: "flex-start", alignItems: "flex-start", p: 5 }}>
                <Link href={"/pakages"}>
                    <IconButton aria-label="" >
                        <img src="/assets/ButtonBack.png" alt="" width={50} />
                    </IconButton></Link>
            </Stack>

            <Stack direction={"column"} spacing={5} sx={{ justifyContent: "center", alignItems: "center", maxWidth: 600, margin: "0 auto" }}>
                <img src="/assets/logoblack.png" alt="" width={118} />

                <Stack direction={"column"} spacing={2} sx={{ width: "100%" }}>
                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: "space-between" }}>
                        <Typography fontWeight={"bold"}>{toggle ? "Sign Up" : "Login"}</Typography>
                        <Typography className='light'>Why join?</Typography>
                    </Stack>
                    {toggle && <TextField placeholder='Name' className='light' variant="outlined" fullWidth sx={{
                        boxShadow: "4px 0px 8px #CDCDCD, -4px 0px 8px #CDCDCD", // Left & Right Shadow 
                        borderRadius: "8px", // Optional: Border Radius
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#CDCDCD" }, // Default Border color
                            "&:hover fieldset": { borderColor: "#A0A0A0" }, // Hover Border color
                            "&.Mui-focused fieldset": { borderColor: "#707070" },
                            // Focus Border 
                        },
                    }} />}
                    <TextField placeholder='Email Address' className='light' variant="outlined" fullWidth sx={{
                        boxShadow: "4px 0px 8px #CDCDCD, -4px 0px 8px #CDCDCD", // Left & Right Shadow 
                        borderRadius: "8px", // Optional: Border Radius
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#CDCDCD" }, // Default Border color
                            "&:hover fieldset": { borderColor: "#A0A0A0" }, // Hover Border color
                            "&.Mui-focused fieldset": { borderColor: "#707070" },
                            // Focus Border 
                        },
                    }} />
                    {toggle && <TextField placeholder='Phone' type='number' className='light' variant="outlined" fullWidth sx={{
                        boxShadow: "4px 0px 8px #CDCDCD, -4px 0px 8px #CDCDCD", // Left & Right Shadow 
                        borderRadius: "8px", // Optional: Border Radius
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#CDCDCD" }, // Default Border color
                            "&:hover fieldset": { borderColor: "#A0A0A0" }, // Hover Border color
                            "&.Mui-focused fieldset": { borderColor: "#707070" },
                            // Focus Border 
                        },
                    }} />}
                    <TextField placeholder='Password' type={showPassword ? "text" : "password"} className='light' variant="outlined" fullWidth sx={{
                        boxShadow: "4px 0px 8px #CDCDCD, -4px 0px 8px #CDCDCD", // Left & Right Shadow
                        borderRadius: "8px", // Optional: Border Radius
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#CDCDCD" }, // Default Border color
                            "&:hover fieldset": { borderColor: "#A0A0A0" }, // Hover Border color
                            "&.Mui-focused fieldset": { borderColor: "#707070" }, // Focus Border color
                        },
                    }} InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />} {/* Show appropriate icon */}
                            </IconButton>
                        ),
                    }} />
                    {toggle && (
                        <TextField placeholder='Confirm Password' type={showPassword1 ? "text" : "password"} className='light' variant="outlined" fullWidth sx={{
                            boxShadow: "4px 0px 8px #CDCDCD, -4px 0px 8px #CDCDCD", // Left & Right Shadow
                            borderRadius: "8px", // Optional: Border Radius
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#CDCDCD" }, // Default Border color
                                "&:hover fieldset": { borderColor: "#A0A0A0" }, // Hover Border color
                                "&.Mui-focused fieldset": { borderColor: "#707070" }, // Focus Border color
                            },
                        }} InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    edge="end"
                                >
                                    {showPassword1 ? <VisibilityOff /> : <Visibility />} {/* Show appropriate icon */}
                                </IconButton>
                            ),
                        }} />
                    )}
                    <Typography fontSize={12} className='light' color="#676767" sx={{ borderBottom: "1px solid #676767", maxWidth: 98, cursor: "pointer", }}>
                        Forgot password?
                    </Typography>
                    <Button variant="contained" className='light' color="primary" sx={{ height: 50 }}>
                        {toggle ? "Sign Up" : "Login"}
                    </Button>
                    <Typography className='light' sx={{ cursor: "pointer" }} onClick={handleToggle}>
                        {toggle ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Login;
