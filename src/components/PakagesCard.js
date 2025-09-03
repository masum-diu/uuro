import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function PakagesCard({ data }) {
    const router = useRouter();
    let getTokenToken = null;

    if (typeof window !== 'undefined') {
        getTokenToken = localStorage.getItem('token');
    }
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
                { package_id: id,quantity:1 },
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
    const [hover, setHover] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 0 },
        380: { slidesPerView: 1, spaceBetween: 0 },
        600: { slidesPerView: 1, spaceBetween: 0 },
        900: { slidesPerView: 1, spaceBetween: 0 },
        1200: { slidesPerView: 1, spaceBetween: 0 },
        1536: { slidesPerView: 1, spaceBetween: 0 },
    };

    return (
        <Box position="relative" sx={{ width: '100%', overflow: 'hidden' }}>
            {/* Custom Navigation Arrows */}
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <IconButton ref={prevRef}>
                    <img src="/assets/leftarrow.png" alt="" width={40} />
                </IconButton>
                <IconButton ref={nextRef}>
                    <img src="/assets/righterrow.png" alt="" width={40} />
                </IconButton>
            </Stack>

            <Swiper
                breakpoints={breakpoints}
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                style={{ width: '100%' }}
                className="mySwiper"
            >
                {data?.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        style={{ cursor: "pointer", width: '100%' }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <Box
                            mb={4}
                            bgcolor={"#011E3C"}
                            position="relative"
                            sx={{
                                height: { lg: 526, xs: 700 },
                                width: "100%",
                                overflow: "hidden",
                                paddingBottom: { xs: 2, lg: 0 }
                            }}
                        >
                            <Grid
                                container
                                spacing={0}
                                sx={{
                                    width: "100%",
                                    maxWidth: "1500px",
                                    mx: "auto",
                                    height: "100%"

                                }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    lg={6}
                                    bgcolor={"#011E3C"}
                                    sx={{
                                        py: 4,
                                        px: { xs: 2, lg: 4 },
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        order: { xs: 2, md: 1 }

                                    }}
                                >
                                    <Typography color="#fff" mb={2} fontSize={{ xs: 24, lg: 36 }} className="Medium"  fontWeight={500} textAlign="left">
                                        {item?.name}
                                    </Typography>

                                    <Typography color="#fff" textAlign="left" fontSize={{ xs: 18, lg: 28 }} className="light">
                                        {item?.description}
                                    </Typography>
                                    {/* <Typography color="#fff" textAlign="left" fontSize={{ xs: 16, lg: 18 }} className="medium" mt={2}>
                                         Price - ${item?.price}
                                    </Typography> */}

                                    <Stack mt={2} direction="row" width="100%" justifyContent={{ xs: 'flex-start', lg: 'flex-end' }} >
                                        <IconButton onClick={()=>handleEvent(item.id)}>
                                            <img src="/assets/Group13(1).png" width={148} alt="icon1" />
                                        </IconButton>
                                        {item?.view_details_link && (
                                            <Link href={item.view_details_link} passHref>
                                                <a target="_blank" rel="noopener noreferrer">
                                                    <IconButton>
                                                        <img src="/assets/Group8.png" width={148} alt="icon2" />
                                                    </IconButton>
                                                </a>
                                            </Link>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    lg={6}
                                    bgcolor={"#011E3C"}
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: { xs: 300, lg: '100%' },
                                        order: { xs: 1, md: 2 }
                                    }}
                                >
                                    <Box position="relative" height="100%" width="100%">
                                        <img
                                            src={item?.image}
                                            alt="Study Abroad"
                                            style={{
                                                objectFit: "cover",
                                                height: "100%",
                                                width: "100%",
                                                display: "block",
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}