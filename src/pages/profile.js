import { useAuth } from '@/authcontext/AuthContext';
import UserProfile from '@/components/UserProfile';
import { Box, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function profile() {
    const [selectedMenu, setSelectedMenu] = useState("Profile");


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // loading state
    const [error, setError] = useState(null);
    const {setUsers}=useAuth()
    const fetchSingleDataevent = async () => {
        try {
            let storedToken = null;

            if (typeof window !== 'undefined') {
                storedToken = localStorage.getItem('token');
            }

            if (!storedToken) {
                setError('Token not found');
                return;
            }

            setLoading(true);
            const response = await axios.get('https://upackage.etherstaging.xyz/api/user', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response?.data) {
                setUsers(response.data); // now sets actual user
                setUser(response.data); // now sets actual user
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // setHasMounted(true);
        fetchSingleDataevent();
    }, []);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };
    const renderMenuContent = () => {
        switch (selectedMenu) {
            case "Profile":
                return <UserProfile user={user} loading={loading} />;
            case "Booking":
                return "Your Bookings are shown here";
            case "Cart":
                return "All Cart Items are listed here";
            case "Settings":
                return "Modify your Account Settings here";
            default:
                return "Select a menu to view details";
        }
    };
    return (
        <Box sx={{ bgcolor: "#F0F0F0", height: { lg: "100vh", xs: 0 }, }}>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center", width: "90%", maxWidth: "1500px", margin: "0 auto", py: 4 }}>
                <IconButton aria-label="" >
                    <img src="/assets/Button - Back to previous page (1).png" alt="" width={50} />
                </IconButton>
                <img src="/assets/logoblack.png" alt="" width={118} />
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    
                    {user?.user?.name||loading ? <Typography className='bold' fontSize={14} sx={{textTransform:"capitalize",bgcolor:"#fff",p:1,borderRadius:1}}>{user?.user?.name}</Typography> : <IconButton aria-label="" >
                        <img src="/assets/Link - Navigate to account.png" alt="" width={32} />
                    </IconButton>}
                    <IconButton aria-label="" >
                        <img src="/assets/Link - Open cart.png" alt="" width={32} />
                    </IconButton>
                </Stack>
            </Stack>
            <Grid
                container

                sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", my: { lg: 5, xs: 0 }, }}
            >
                <Stack direction={{ lg: "row", xs: "column" }} spacing={3}>
                    <Grid item lg={4} bgcolor={"#FFFFFF"} sx={{ boxShadow: "4px 0px 8px #E1E1E1, -4px 0px 8px #E1E1E1" }}>
                        <img src="/assets/young-bearded-businessman-against-gray.png" alt="" width={"100%"} />

                        <Stack direction={"column"} p={4} spacing={3} >
                            <Stack direction={"column"} sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("Profile")}>
                                <Typography fontSize={15} className='bold'>Profile</Typography>
                                <Typography fontStyle={10} className='light' sx={{ borderBottom: "1px solid #222222", pb: 1.5 }}>View your Profile</Typography>
                            </Stack>
                            <Stack direction={"column"} sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("Booking")}>
                                <Typography fontSize={15} className='bold'>Booking</Typography>
                                <Typography fontStyle={10} className='light' sx={{ borderBottom: "1px solid #222222", pb: 1.5 }}>View your booking</Typography>
                            </Stack>
                            <Stack direction={"column"} sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("Cart")}>
                                <Typography fontSize={15} className='bold'>Cart</Typography>
                                <Typography fontStyle={10} className='light' sx={{ borderBottom: "1px solid #222222", pb: 1.5 }}>View all items on your cart list</Typography>
                            </Stack>
                            <Stack direction={"column"} sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("Settings")}>
                                <Typography fontSize={15} className='bold'>Settings</Typography>
                                <Typography fontStyle={10} className='light' sx={{ borderBottom: "1px solid #222222", pb: 1.5 }}>Shipping address, notifications & more</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item lg={8} bgcolor={"#FFFFFF"} sx={{ boxShadow: "4px 0px 8px #E1E1E1, -4px 0px 8px #E1E1E1", }}>
                        {renderMenuContent()}
                    </Grid>
                </Stack>
            </Grid>
        </Box>
    )
}

export default profile
