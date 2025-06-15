import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Affilation({ data }) {
    const [hover, setHover] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },
        380: { slidesPerView: 1, spaceBetween: 15 },
        600: { slidesPerView: 2, spaceBetween: 20 },
        900: { slidesPerView: 3, spaceBetween: 25 },
        1200: { slidesPerView: 5, spaceBetween: 30 },
        1536: { slidesPerView: 6, spaceBetween: 30 },
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
                // onInit={(swiper) => {
                //     swiper.params.navigation.prevEl = prevRef.current;
                //     swiper.params.navigation.nextEl = nextRef.current;
                //     swiper.navigation.init();
                //     swiper.navigation.update();
                // }}
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
                       
                            <img
                                src={`https://engine.uurotravels.com/${item?.file_path}`}
                                alt=""
                                width="100%"
                                height="100%"
                                style={{ objectFit: "cover", borderRadius: "5px" }}
                            />
                          
                      
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
