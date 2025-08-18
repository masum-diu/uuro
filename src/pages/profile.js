import { useAuth } from '@/authcontext/AuthContext';
import UserProfile from '@/components/UserProfile';
import { Badge, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import Cart from '@/components/Cart';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import withAuth from '../../middleware';
function profile() {
    const [selectedMenu, setSelectedMenu] = useState("Profile");
    const [dataCategories, setDataCategories] = useState([]);
    const [dataCard, setDataCard] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // loading state
    const [error, setError] = useState(null);
    const router = useRouter();
    const { setUsers, setBage, bage } = useAuth()
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
    ;

    const fetchDatacard = async () => {
        let storedToken = null;
        if (typeof window !== 'undefined') {
            storedToken = localStorage.getItem('token');
        }
        try {
            setLoading(true);
            const response = await axios.get('https://upackage.etherstaging.xyz/api/cart', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                },
            });
            setDataCard(response?.data?.packages
            );
            setBage(response?.data?.packages.length)
            // localStorage.setItem("badgeCount", response?.data?.packages.length);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`https://upackage.etherstaging.xyz/api/cart/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success('Item deleted successfully.');
                fetchDatacard();
            } else {
                toast.error('Failed to delete the item.');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'Delete failed.';
            toast.error("Failed to delete the item.");
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (!user) {
                await fetchSingleDataevent();
            }
            fetchDatacategories();
            fetchDatacard()
        };

        fetch();
    }, []);


    useEffect(() => {
        if (router.query?.tab === 'cart') {
            setSelectedMenu('Cart');
        }
    }, [router.query]);
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };
    const renderMenuContent = () => {
        switch (selectedMenu) {
            case "Profile":
                return <UserProfile user={user} loading={loading} fetchSingleDataevent={() => fetchSingleDataevent()} />;
            case "Booking":
                return "Your Bookings are shown here";
            case "Cart":
                return <Cart data={dataCard} user={user} loading={loading} handleDelete={handleDelete} />;
            case "Settings":
                return "Modify your Account Settings here";
            default:
                return "Select a menu to view details";
        }
    };
    const tabs = [
        { name: "Home", path: "/" },
        { name: "Study Abroad", path: "/uuro/study-abroad", id: 4 },
        { name: "Tour Packages Inbound", path: "/uuro/tour-packages-Inbound", id: 5 },
        { name: "Visit Visa", path: "/uuro/visit-visa", id: 6 },
    ];


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                                    cursor: "pointer",
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
            <Divider sx={{ display: { lg: "none", xs: "block" } }} />
            <Box sx={{ p: 2, display: { lg: "none", xs: "block" } }}>
                {user?.user?.name ? (
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"}>
                        <Link href="/" passHref legacyBehavior sx={{ textDecoration: "none", cursor: "pointer" }}>
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
        <Box >
            <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center", width: "90%", maxWidth: "1500px", margin: "0 auto", py: 4 }}>
                <IconButton aria-label="open drawer"
                    edge="start" onClick={handleDrawerToggle}>
                    <img src="/assets/Button - Back to previous page (1).png" alt="" width={50} />
                </IconButton>
                <img src="/assets/logoblack.png" alt="" width={118} />
                <Stack direction={"row"} spacing={2} alignItems={"center"} >

                    {user?.user?.name || loading ? <Typography className='bold' fontSize={14} sx={{ textTransform: "capitalize", display: { lg: "block", xs: "none" } }}>{user?.user?.name}</Typography> : <IconButton aria-label="" >
                        <img src="/assets/Link - Navigate to account.png" alt="" width={32} style={{ textTransform: "capitalize", display: { lg: "block", xs: "none" } }} />
                    </IconButton>}
                    <Badge badgeContent={bage} color="background4">
                        <img src="/assets/Link - Open cart.png" alt="" width={32} />
                    </Badge>
                </Stack>
            </Stack>
            <Grid
                container

                sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", my: { lg: 5, xs: 0 }, }}
            >
                <Stack direction={{ lg: "row", xs: "column" }} spacing={3} width={"100%"}>
                    <Grid item lg={4} bgcolor={"#FFFFFF"} sx={{
                        border: "1px solid #e0e0e0",
                        background: "linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                    }}>
                        <Box
                            sx={{
                                width: "100%",
                                overflow: 'hidden',

                            }}
                        >
                            {loading ?
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "20vh",
                                        flexDirection: "column",
                                    }}
                                >
                                    <BeatLoader color="#191919" size={30} />
                                </Box> : <img
                                    src={user?.user?.image || "/assets/blank-profile-picture-973460_960_720.webp"}
                                    alt="profile"
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />}
                        </Box>

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
                    <Grid item lg={8} bgcolor={"#FFFFFF"} sx={{ border: "1px solid #e0e0e0",
                                background: "linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%)",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.06)", }}>
                        {renderMenuContent()}
                    </Grid>
                </Stack>
            </Grid>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{

                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 350,
                        bgcolor: 'white'
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default withAuth(profile)
