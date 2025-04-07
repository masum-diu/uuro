import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import Typography from '@mui/material/Typography'


export default function Testimonial() {
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },    // Extra small devices
        380: { slidesPerView: 1, spaceBetween: 15 },  // Small screens
        600: { slidesPerView: 2, spaceBetween: 20 },  // Phones
        900: { slidesPerView: 3, spaceBetween: 25 },  // Tablets & Laptops
        1200: { slidesPerView: 3, spaceBetween: 30 }, // Desktops
        1536: { slidesPerView: 3, spaceBetween: 30 }, // Extra-large screens
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
                style={{marginTop: "20px",marginBottom: "20px"}}
            >
               
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%",  height: "100%", minHeight: 500, }} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%" ,height: "100%", minHeight: 500,}} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", height: "100%", minHeight: 500, }} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", height: "100%", minHeight: 500,}} alt="" />
                </SwiperSlide>
               
                <SwiperSlide>
                    <img src="/assets/blog_1.png" style={{ width: "100%", height: "100%", minHeight: 500, }} alt="" />
                </SwiperSlide>

            </Swiper>
        </>
    );
}
