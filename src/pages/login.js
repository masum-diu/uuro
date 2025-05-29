import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Login() {
    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        role: "user"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return false;
        }
        
        if (toggle) {
            if (formData.password !== formData.password_confirmation) {
                setError('Passwords do not match');
                return false;
            }
            if (!formData.name) {
                setError('Name is required');
                return false;
            }
        }
        
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (toggle) {
                // Signup flow
                const response = await axios.post('https://upackage.etherstaging.xyz/api/register', formData);
                setSuccess('Registration successful! Logging you in...');
            }

            // Login flow (after signup or for regular login)
            const loginPayload = {
                email: formData.email,
                password: formData.password
            };

            const loginResponse = await axios.post('https://upackage.etherstaging.xyz/api/login', loginPayload);
            console.log(loginResponse)
            if (loginResponse?.data?.token) {
                localStorage.setItem('token', loginResponse.data.token);
                router.push('/pakages'); // Redirect to packages page
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: "#fff", height: "100vh" }}>
            <Stack direction={"row"} sx={{ justifyContent: "flex-start", alignItems: "flex-start", p: 5 }}>
                <Link href={"/pakages"} passHref>
                    <IconButton aria-label="back">
                        <img src="/assets/ButtonBack.png" alt="" width={50} />
                    </IconButton>
                </Link>
            </Stack>

            <Stack direction={"column"} spacing={5} sx={{ 
                justifyContent: "center", 
                alignItems: "center", 
                maxWidth: 600, 
                margin: "0 auto",
                px: 2 // Add horizontal padding on mobile
            }}>
                <img src="/assets/logoblack.png" alt="Logo" width={118} />

                <Stack direction={"column"} spacing={3} sx={{ width: "100%" }}>
                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h6" fontWeight={"bold"}>
                            {toggle ? "Sign Up" : "Login"}
                        </Typography>
                        <Typography color="text.secondary">Why join?</Typography>
                    </Stack>

                    {/* Error/Success Messages */}
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}

                    {toggle && (
                        <TextField 
                            placeholder='Name' 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth 
                            sx={textFieldStyles}
                        />
                    )}
                    
                    <TextField 
                        placeholder='Email Address' 
                        name='email'
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth 
                        sx={textFieldStyles}
                    />
                    
                    {toggle && (
                        <TextField 
                            placeholder='Phone' 
                            type='tel'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth 
                            sx={textFieldStyles}
                        />
                    )}
                    
                    <TextField 
                        placeholder='Password' 
                        type={showPassword ? "text" : "password"}
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth 
                        sx={textFieldStyles}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    
                    {toggle && (
                        <TextField 
                            placeholder='Confirm Password' 
                            type={showConfirmPassword ? "text" : "password"}
                            name='password_confirmation'
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            fullWidth 
                            sx={textFieldStyles}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                    )}
                    
                    {!toggle && (
                        <Typography 
                            fontSize={12} 
                            color="text.secondary" 
                            sx={{ 
                                borderBottom: "1px solid", 
                                maxWidth: 110, 
                                cursor: "pointer",
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            Forgot password?
                        </Typography>
                    )}
                    
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ height: 50, py: 1.5 }} 
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            toggle ? "Sign Up" : "Login"
                        )}
                    </Button>
                    
                    <Typography 
                        color="text.secondary" 
                        sx={{ 
                            cursor: "pointer",
                            textAlign: 'center',
                            '&:hover': { color: 'primary.main' }
                        }} 
                        onClick={() => setToggle(!toggle)}
                    >
                        {toggle ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

// Reusable text field styles
const textFieldStyles = {
    boxShadow: "4px 0px 8px #CDCDCD, -4px 0px 8px #CDCDCD",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#CDCDCD" },
        "&:hover fieldset": { borderColor: "#A0A0A0" },
        "&.Mui-focused fieldset": { borderColor: "#707070" },
    },
};

export default Login;