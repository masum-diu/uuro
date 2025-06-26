// pages/packagesView.js

import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

function PackagesView() {
    const [dataCategories, setDataCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { packages } = router.query;

    let getTokenToken = null;

    if (typeof window !== 'undefined') {
        getTokenToken = localStorage.getItem('token');
    }

    const fetchDataCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://upackage.etherstaging.xyz/api/packages?category_id=${packages}`
            );
            setDataCategories(response?.data?.packages || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (router.isReady && packages) {
            fetchDataCategories();
        }
    }, [router.isReady, packages]);

    const handleEvent = async (id) => {
        // console.log(id)
        try {
            // Get token from localStorage
            const storedToken = localStorage.getItem('token');

            if (!storedToken) {
                setError("No token found. Please log in.");
                router.push('/login');
                return;
            }

            // Make login request
            const AddResponse = await axios.post(
                'https://upackage.etherstaging.xyz/api/cart/add',
                { package_id: id },
                {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (AddResponse?.data?.message) {
                // console.log(AddResponse?.data);
                if (AddResponse?.data?.success === true) {
                    toast.success(AddResponse?.data?.message);
                     router.push('/profile?tab=cart');
                }
                else {
                    toast.error(AddResponse?.data?.message);
                }

            }

            // Optional: check for expected success response

        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'An error occurred';

            router.push('/login');
        } finally {

        }
    };


    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}
            >
                <BeatLoader color="#191919" size={30} />
            </Box>
        );
    }

    return (
        <Box sx={{ px: 3, bgcolor: '#F0F0F0', py: 8 }}>
            {/* Fixed top icon */}
            <Stack direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Link href="/?showGrid=true" passHref>
                    <IconButton
                        aria-label=""
                        sx={{
                            objectFit: 'cover',
                            position: 'fixed',
                            zIndex: 1000,
                            right: 10,
                        }}
                    >
                        <img src="/assets/Group 10.png" alt="" style={{ width: 45 }} />
                    </IconButton>
                </Link>
            </Stack>

            {/* Grid content */}
            <Grid container columnSpacing={5}>
                {/* Sticky left image - only on desktop */}
                <Grid
                    item
                    lg={8}
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
                        columnGap: 3,
                        mt: 5,
                        position: 'sticky',
                        top: 80,
                        backgroundColor: 'white',
                        zIndex: 10,
                        height: 522,
                    }}
                >
                    {dataCategories.slice(0, 2).map((item, index) => (
                        <img
                            key={index}
                            src={item?.image || '/assets/placeholder.png'}
                            alt=""
                            style={{ width: '25%', objectFit: 'cover', flexGrow: 1, borderRadius: 6 }}
                        />
                    ))}

                </Grid>

                {/* Right content */}
                <Grid item lg={4} xs={12} sm={12}>
                    {dataCategories?.map((item, index) => (
                        <Stack
                            key={index}
                            direction="column"
                            spacing={3}
                            pt={5}
                            sx={{
                                mb: 4,
                                bgcolor: 'white',
                                borderRadius: 2,
                                p: { xs: 2, md: 3 }, // padding ছোট স্ক্রিনে কম, বড় স্ক্রিনে বেশি
                                boxShadow: { xs: 1, md: 3 },
                            }}
                        >
                            <img
                                src={item?.image || '/assets/Category-Study-(Hero-Banner).png'}
                                alt=""
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: 267,
                                    objectFit: 'cover',
                                    borderRadius: 6,
                                }}
                            />

                            <Typography
                                className="bold"
                                color="initial"
                                sx={{
                                    borderTop: '1px solid #000000',
                                    pt: 2,
                                    display: 'flex',
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'column',
                                        lg: 'row',
                                    },
                                    justifyContent: 'space-between',
                                    alignItems: {
                                        xs: 'flex-start',
                                        md: 'center',
                                    },
                                    gap: 2,
                                }}
                            >
                                <Stack direction="column" spacing={1}>
                                    Package - {1 + index} ({item?.name || 'Package Name'})
                                    {item?.price ? (
                                        <span className="bold" style={{ color: '#191919', fontSize: 16 }}>
                                            Price - ${item?.price} 
                                        </span>
                                    ) : (
                                        <span className="bold" style={{ color: '#191919', fontSize: 16 }}>Free</span>
                                    )}
                                </Stack>


                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                <Link href={item.view_details_link} passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <img
                                            src="/assets/Group8.png"
                                            style={{
                                                cursor: 'pointer',
                                                maxWidth: 120,
                                                objectFit: 'contain',
                                                width: '100%',
                                            }}
                                        />
                                    </a>
                                </Link>


                                <img
                                    onClick={() => handleEvent(item?.id)}
                                    src="/assets/checkout.png"
                                    style={{
                                        cursor: 'pointer',
                                        maxWidth: 120,
                                        objectFit: 'contain',
                                        width: '100%',
                                    }}
                                />
                            </Stack>
                        </Stack>
                    ))}
                </Grid>

            </Grid>
        </Box>
    );
}

export default PackagesView;
