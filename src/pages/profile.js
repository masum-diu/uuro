import { Box, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

function profile() {
    const [selectedMenu, setSelectedMenu] = useState("User Profile");

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const renderMenuContent = () => {
        switch (selectedMenu) {
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
        <Box sx={{ bgcolor: "#F0F0F0", height: "100vh", p: 5 }}>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center", }}>
                <IconButton aria-label="" >
                    <img src="/assets/Button - Back to previous page (1).png" alt="" width={50} />
                </IconButton>
                <img src="/assets/logoblack.png" alt="" width={118} />
                <Stack direction={"row"}>
                    <IconButton aria-label="" >
                        <img src="/assets/Link - Navigate to account.png" alt="" width={32} />
                    </IconButton>
                    <IconButton aria-label="" >
                        <img src="/assets/Link - Open cart.png" alt="" width={32} />
                    </IconButton>
                </Stack>
            </Stack>
            <Grid
                container
                columnGap={6}
                // bgcolor={"red"}
                //   spacing={2}
                sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", mt: 5 }}
            >
                <Grid item lg={4} bgcolor={"#FFFFFF"} sx={{ boxShadow: "4px 0px 8px #E1E1E1, -4px 0px 8px #E1E1E1" }}>
                    <img src="/assets/young-bearded-businessman-against-gray.png" alt="" width={"100%"} />
                
                    <Stack direction={"column"} p={4} spacing={3} >
                        <Stack direction={"column"} sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("Booking")}>
                            <Typography fontSize={15} fontWeight={"bold"}>Booking</Typography>
                            <Typography fontStyle={10} className='light' sx={{ borderBottom: "1px solid #222222", pb: 1.5 }}>View your booking</Typography>
                        </Stack>
                        <Stack direction={"column"} sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("Cart")}>
                            <Typography fontSize={15} fontWeight={"bold"}>Cart</Typography>
                            <Typography fontStyle={10} className='light' sx={{ borderBottom: "1px solid #222222", pb: 1.5 }}>View all items on your cart list</Typography>
                        </Stack>
                        <Stack direction={"column"} sx={{ cursor: "pointer" }} onClick={() => handleMenuClick("Settings")}>
                            <Typography fontSize={15} fontWeight={"bold"}>Settings</Typography>
                            <Typography fontStyle={10} className='light' sx={{ borderBottom: "1px solid #222222", pb: 1.5 }}>Shipping address, notifications & more</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item lg={7} bgcolor={"#FFFFFF"} sx={{ boxShadow: "4px 0px 8px #E1E1E1, -4px 0px 8px #E1E1E1",p:4 }}>
                    <Typography paragraph className='light'>{renderMenuContent()}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default profile
