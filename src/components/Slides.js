import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import Typography from '@mui/material/Typography'


export default function Slides() {
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },    // Extra small devices
        380: { slidesPerView: 1, spaceBetween: 15 },  // Small screens
        600: { slidesPerView: 2, spaceBetween: 20 },  // Phones
        900: { slidesPerView: 3, spaceBetween: 25 },  // Tablets & Laptops
        1200: { slidesPerView: 4, spaceBetween: 30 }, // Desktops
        1536: { slidesPerView: 5, spaceBetween: 30 }, // Extra-large screens
    };
    return (
        <>
            <Swiper
                 breakpoints={breakpoints}
                 navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
                style={{marginTop: "40px",marginBottom: "40px"}}
            >
                <SwiperSlide style={{ height: "100%", minHeight: "500px", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", }}>
                    <Typography fontSize={45} fontWeight={"medium"} px={2} color="initial"  >
                        GORE-TEX
                        PRO in action
                    </Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", maxWidth: "374px", height: "100%", minHeight: 500, }} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", maxWidth: "374px" ,height: "100%", minHeight: 500,}} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", maxWidth: "374px",height: "100%", minHeight: 500, }} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", maxWidth: "374px" ,height: "100%", minHeight: 500,}} alt="" />
                </SwiperSlide>
               
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", maxWidth: "374px",height: "100%", minHeight: 500, }} alt="" />
                </SwiperSlide>

            </Swiper>
        </>
    );
}
