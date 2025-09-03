import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Testimonial({ data }) {
    const [hover, setHover] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },
        380: { slidesPerView: 1, spaceBetween: 15 },
        600: { slidesPerView: 2, spaceBetween: 20 },
        900: { slidesPerView: 3, spaceBetween: 25 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
        1536: { slidesPerView: 3, spaceBetween: 30 },
    };

    return (
        <Box position="relative" mb={3} >
            {/* Custom Navigation Arrows */}
            <Stack
                direction="row"
                // spacing={1}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
                mb={1}


            >
                <IconButton ref={prevRef} >
                    <img src="/assets/leftarrow.png" alt="" width={40} />
                </IconButton>
                <IconButton ref={nextRef} >
                    <img src="/assets/righterrow.png" alt="" width={40} />
                </IconButton>
            </Stack>

            <Swiper
                breakpoints={breakpoints}
                  modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false, 
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className="mySwiper"
            // style={{ marginTop: 50 }}
            >
                {data?.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <Box sx={{ position: "relative", width: "100%", height: 500 }}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.43) 100%, rgba(34, 34, 34, 0.46) 0%)",
                                    zIndex: 1,
                                    borderRadius: "5px",
                                }}
                            />
                            <img
                                src={`https://engine.uurotravels.com/${item?.media_files?.file_path}`}
                                alt=""
                                width="100%"
                                height="100%"
                                style={{ objectFit: "cover", borderRadius: "5px" }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    transform: hover === index ? 'translateY(0)' : 'translateY(100%)',
                                    opacity: hover === index ? 1 : 0,
                                    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.43) 100%, rgba(34, 34, 34, 0.46) 0%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    zIndex: 1,
                                    justifyContent: "center",
                                    color: "#fff",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                }}
                            >
                                <Typography
                                    className='Regular'
                                    sx={{
                                        opacity: hover === index ? 1 : 0,
                                        transition: "opacity 0.5s ease-out",
                                        fontSize: 20,
                                        m: 2,
                                        textAlign: "left",
                                    }}
                                >
                                    {item?.description_en?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                                </Typography>
                            </Box>
                            <Typography
                                color="white"
                                fontSize={22}
                                className='bold'
                                 fontWeight={700}
                                sx={{
                                    position: "absolute",
                                    zIndex: 2,
                                    bottom: 20,
                                    left: 20,
                                    textTransform: "capitalize",
                                    p: 2,
                                }}
                            >
                                {hover !== index ? item?.title_en : ""}
                            </Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
