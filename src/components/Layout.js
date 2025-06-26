import {
    AppBar,
    Box,
    Stack,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Badge
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "@/authcontext/AuthContext";

const Layout = ({ children, setHover }) => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dataCategories, setDataCategories] = useState([]);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { bage } = useAuth()
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
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    const fetchDatacategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://upackage.etherstaging.xyz/api/categories');
            setDataCategories(response?.data?.categories
            );
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        const fetch = async () => {
            if (!user) {
                await fetchSingleDataevent();
            }
            fetchDatacategories();
        };

        fetch();
    }, [bage]);


    const tabs = [
        { name: "Home", path: "/" },
        { name: "Study Abroad", path: "/uuro/study-abroad", id: 4 },
        { name: "Tour Packages Inbound", path: "/uuro/tour-packages-Inbound", id: 5 },
        { name: "Visit Visa", path: "/uuro/visit-visa", id: 6 },
    ];

    setHover(showNavbar);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleCart = () => {
        let storedToken = null;

        if (typeof window !== 'undefined') {
            storedToken = localStorage.getItem('token');
        }

        if(storedToken){
            router.push("/profile?tab=cart")
        }
        else{
            router.push("/login")
        }
    }
    const drawer = (
        <Box sx={{ bgcolor: 'white', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <IconButton onClick={handleDrawerToggle} sx={{ border: "1px solid #E1E1E1", borderRadius: '50%', p: 1 }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {tabs.map((tab) => {
                    const matchedCategory = dataCategories.find(item => item.name === tab.name);

                    const handleClick = () => {
                        handleDrawerToggle(); // close drawer
                        if (matchedCategory) {
                            localStorage.setItem('selected_category_id', matchedCategory.id);
                            // console.log(`Saved category_id: ${matchedCategory.id}`);
                        }
                    };
                    return (
                        <Link
                            key={tab.name}
                            href={{
                                pathname: tab.path,
                                query: tab.id ? { id: tab.id } : undefined,

                            }}
                            passHref
                            legacyBehavior
                        >
                            <ListItem
                                button
                                onClick={() => {
                                    handleDrawerToggle();
                                    handleClick();
                                }}

                                sx={{
                                    borderLeft: router.asPath.split('?')[0] === tab.path ? "4px solid #191919" : "none",
                                    pl: 2,
                                    py: 2,
                                }}
                            >
                                <ListItemText
                                
                                    primary={tab.name}
                                    primaryTypographyProps={{
                                        className: router.asPath.split('?')[0] === tab.path ? "bold" : "Medium",
                                        fontSize: 18,
                                        color: "#222222"
                                    }}
                                />
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
                {user?.user?.name ? (
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"}>
                        <Link href="/profile" passHref legacyBehavior sx={{ textDecoration: "none", cursor: "pointer" }}>
                            <Typography
                                className="bold"
                                sx={{
                                    textTransform: "capitalize",
                                    color: "#000",
                                    fontWeight: 500,
                                    cursor: "pointer"
                                }}
                                fontSize={14}
                            >
                                Welcome,
                                <br />
                                {user.user.name}
                            </Typography>
                        </Link>
                        <IconButton>
                            <LogoutIcon style={{ color: "#000" }} onClick={() => {
                                localStorage.removeItem('token');
                                setUser(null);
                                router.push('/login');
                            }} />
                        </IconButton></Stack>
                ) : (
                    <Stack direction="row" spacing={1}>
                        <IconButton aria-label="account" onClick={() => router.push('/login')}>
                            <img src="/assets/Link - Navigate to account.png" alt="Account" width={32} />
                        </IconButton>

                    </Stack>
                )}
            </Box>
        </Box>
    );

    return (
        <Box sx={{ width: "1500px", margin: "0 auto", maxWidth: "90%" }}>
            {/* Mobile Header with Drawer */}
            <Stack
                direction={"row"}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: { xs: "flex", md: "none" },
                    py: 1
                }}
            >
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                >
                    <img src="/assets/Button - Back to previous page (1).png" alt="Back" width={50} />
                    {/* <MenuIcon fontSize="large" /> */}
                </IconButton>
                <Link href="/" passHref legacyBehavior sx={{ cursor: "pointer" }}>
                    <img src="/assets/logoblack.png" alt="Logo" width={110} /></Link>
                <Stack direction={"row"} >

                    <IconButton aria-label="account" onClick={handleCart}>
                        <Badge badgeContent={bage} color="background4" >
                            <img src="/assets/Link - Open cart.png" alt="" width={32} />
                        </Badge>
                    </IconButton>
                </Stack>
            </Stack>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 350,
                        bgcolor: 'white'
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop Navbar */}
            <Stack
                position="fixed"
                sx={{
                    zIndex: 9999,
                    width: "1500px",
                    margin: "0 auto",
                    maxWidth: "90%",
                    display: { xs: "none", md: "flex" }
                }}
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
                        {tabs.map((tab) => {
                            const matchedCategory = dataCategories.find(item => item.name === tab.name);

                            const handleClick = () => {

                                if (matchedCategory) {
                                    localStorage.setItem('selected_category_id', matchedCategory.id);
                                    // console.log(`Saved category_id: ${matchedCategory.id}`);
                                }
                            };
                            return (
                                <Link key={tab.name} href={{
                                    pathname: tab.path,
                                    query: tab.id ? { id: tab.id } : undefined,
                                }} passHref legacyBehavior>
                                    <Typography
                                        onClick={() => handleClick()}
                                        className={router.asPath.split('?')[0] === tab.path ? "bold" : "Medium"}
                                        fontSize={22}
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
                            )
                        })}
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
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "100%",
                        m: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            borderRadius: 1,
                            p: 0.5,
                            gap: 1,
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {user?.user?.name || loading ? (
                            <>
                                <Link href="/profile" passHref legacyBehavior sx={{ textDecoration: "none", cursor: "pointer" }}>

                                    <Typography
                                        className="bold"
                                        sx={{
                                            textTransform: "capitalize",
                                            // bgcolor: "rgba(255, 255, 255, 0.1)",
                                            // backdropFilter: "blur(10px)",
                                            // WebkitBackdropFilter: "blur(10px)",
                                            // border: "1px solid rgba(255, 255, 255, 0.3)",
                                            // borderRadius: 1,
                                            p: 1,
                                            color: "#000",
                                            fontWeight: 500,
                                            cursor: "pointer"
                                        }}
                                        fontSize={14}
                                    >
                                        {user?.user?.name}
                                    </Typography>
                                </Link>
                                <IconButton>
                                    <LogoutIcon style={{ color: "#000" }} onClick={() => {
                                        localStorage.removeItem('token');
                                        setUser(null);
                                        router.push('/login');
                                    }} />
                                </IconButton>
                            </>
                        ) : (


                            <IconButton aria-label="account" onClick={() => router.push('/login')}>
                                <img src="/assets/Link - Navigate to account.png" alt="Account" width={32} />
                            </IconButton>


                        )}
                        <IconButton aria-label="account" onClick={handleCart}>
                            <Badge badgeContent={bage} color="background4" >
                                <img src="/assets/Link - Open cart.png" alt="" width={32} />
                            </Badge>
                        </IconButton>
                    </Box>
                </Stack>
            </Stack>

            {children}
        </Box>
    );
};

export default Layout;