import { AppBar, Box, Stack, Toolbar, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Layout = ({ children, setHover }) => {
    const [showNavbar, setShowNavbar] = useState(false);
    const router = useRouter();

    const tabs = [
        { name: "Home", path: "/" },
        { name: "Study Abroad", path: "/uuro/study-abroad" ,id: 4}, 
        { name: "Tour Packages Inbound", path: "/uuro/tour-packages-Inbound",id: 5 },
        { name: "Visit Visa", path: "/uuro/visit-visa",id: 6 },
    ];

    setHover(showNavbar);

    return (
        <Box sx={{ width: "1440px", margin: "0 auto", maxWidth: "90%" }}>
            {/* Small Screen Navbar */}
            <Stack 
                direction={"row"} 
                sx={{ 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    display: { xs: "flex", md: "none" }, 
                    
                }}
            >
                <IconButton aria-label="back">
                    <img src="/assets/Button - Back to previous page (1).png" alt="Back" width={50} />
                </IconButton>
                <img src="/assets/logoblack.png" alt="Logo" width={110} />
                <Stack direction={"row"}>
                    <IconButton aria-label="account">
                        <img src="/assets/Link - Navigate to account.png" alt="Account" width={32} />
                    </IconButton>
                    <IconButton aria-label="cart">
                        <img src="/assets/Link - Open cart.png" alt="Cart" width={32} />
                    </IconButton>
                </Stack>
            </Stack>

            {/* Large Screen Navbar */}
            <Stack
                position="fixed"
                sx={{ zIndex: 9999, width: "1440px", margin: "0 auto", maxWidth: "90%", display: { xs: "none", md: "flex" } }} 
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <AppBar
                    position="fixed"
                    color="white"
                    sx={{
                        backgroundColor: "white",
                        boxShadow: "none",
                        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
                        transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseLeave={() => setShowNavbar(false)}
                >
                    <Toolbar sx={{ width: "100%", margin: "0 auto", justifyContent: "space-between", alignItems: "center" }}>
                        {tabs.map((tab) => (
                            <Link key={tab.name}  href={{
                                pathname: tab.path, 
                                query: tab.id ? { id: tab.id } : undefined,
                              }} passHref legacyBehavior>
                                <Typography
                                    fontWeight={router.asPath.split('?')[0] === tab.path ? "bold" : "medium"}
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
                                        borderTop: router.asPath.split('?')[0] === tab.path ? "4px solid #191919" : "4px solid #DBDBDC",
                                        pb: 1,
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
                        <img style={{ marginTop: "-2px" }} src="/assets/Navbar.png" alt="Navbar" />
                    </Stack>
                </AppBar>
            </Stack>
            {children}
        </Box>
    );
};

export default Layout;
