import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Layout = ({ children, setHover }) => {
    const [showNavbar, setShowNavbar] = useState(false);
    const router = useRouter();
    const tabs = [
        { name: "Home", path: "/" },
        { name: "Study Abroad", path: "/package/study-abroad" },
        { name: "Tour Packages Inbound", path: "/package/tour-packages-Inbound" },
        { name: "Visit Visa", path: "/package/visit-visa" },
    ];
    setHover(showNavbar)
    return (
        <Box sx={{ width: "1440px", margin: "0 auto", maxWidth: "90%" }}>
            <Stack
                position="fixed"
                sx={{ zIndex: 9999, width: "1440px", margin: "0 auto", maxWidth: "90%" }}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}

            >
                {/* AppBar with animation */}
                <AppBar
                    position="fixed"
                    color='white'
                    sx={{
                        backgroundColor: "white",
                        boxShadow: "none",
                        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
                        transition: "transform 0.3s ease-in-out",

                    }}
                    onMouseLeave={() => setShowNavbar(false)}
                >
                    <Toolbar
                        sx={{
                            width: "100%",
                            // maxWidth: "1440px",
                            margin: "0 auto",
                            justifyContent: "space-between",
                            alignItems: "center",

                            //  bgcolor: "red",

                        }}
                    >
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.path}
                                passHref
                                legacyBehavior
                            >
                                <Typography
                                    key={tab}
                                    fontWeight={router.asPath === tab.path ? "bold" : "medium"}
                                    fontSize={25}
                                    sx={{
                                        cursor: "pointer",
                                        color: "#222222",
                                        pt: 3,
                                        width: "100%",
                                        textAlign: "left",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        margin: "0 10px",
                                        //  bgcolor: "red",
                                        borderTop: router.asPath === tab.path ? "4px solid #191919" : "4px solid #DBDBDC", // Highlight selected tab
                                        pb: 1, // Add padding to the bottom for the border
                                    }}
                               
                                >
                                    {tab.name}
                                </Typography>
                            </Link>
                        ))}
                    </Toolbar>
                    <Stack
                        sx={{
                            transform: "translateY(100%)",
                            transition: "transform 0.3s ease-in-out",
                            justifyContent: "center",
                            alignItems: "center",

                        }}
                        onMouseEnter={() => setShowNavbar(true)}

                    >
                        <img
                            style={{ marginTop: "-2px" }}
                            src="/assets/Navbar.png"
                            alt="Navbar"
                        />
                    </Stack>
                </AppBar>

                {/* Fixed Navbar Image */}

            </Stack>
            {children}
        </Box>
    );
};

export default Layout;